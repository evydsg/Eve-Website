import { useEffect, useRef, useState } from 'react'
import {
  DAYS, DAY_LETTERS, NTH_LABELS, addDays, dayIndex, formatTime, getRule, newId, occursOn,
  repeatLabel, ruleLabel, shortDate, sortTasks, startOfWeek, subsOn, ymd,
} from './todoUtils'
import {
  DndContext, MouseSensor, TouchSensor, closestCenter, useSensor, useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import TodoStats from './TodoStats.jsx'

// Weekly to-do board + Progress charts. Pure UI — storage is handled by
// whoever renders it (see Todo.jsx). Task shape is documented in todoUtils.js.

// ── Small pieces ──────────────────────────────────────────

function Circle({ done, onClick, label }) {
  return (
    <button
      className={`todo-circle ${done ? 'todo-circle--done' : ''}`}
      onClick={onClick}
      aria-label={label}
      aria-pressed={done}
    >
      {done && (
        <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
          <path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

function AddTask({ onAdd, dayName }) {
  const [text, setText] = useState('')
  const submit = (e) => {
    e.preventDefault()
    const value = text.trim()
    if (!value) return
    onAdd(value)
    setText('')
  }
  return (
    <form className="todo-add" onSubmit={submit}>
      <span className="todo-circle todo-circle--ghost" aria-hidden="true" />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add task"
        aria-label={`Add task on ${dayName}`}
      />
    </form>
  )
}

// A task card you can drag up or down within its day column.
// Mouse: drag after moving a few pixels (so clicks still work).
// Touch: press and hold briefly, then drag (so swiping still scrolls).
function SortableCard({ id, children }) {
  const { setNodeRef, listeners, transform, transition, isDragging } = useSortable({ id })
  return (
    <article
      ref={setNodeRef}
      className={`todo-group ${isDragging ? 'todo-group--dragging' : ''}`}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      {...listeners}
    >
      {children}
    </article>
  )
}

const withoutKey = (map, key) => {
  const next = { ...(map || {}) }
  delete next[key]
  return next
}

// ── Editor modal ──────────────────────────────────────────

const PRESETS = [
  { label: 'Every day', days: [0, 1, 2, 3, 4, 5, 6] },
  { label: 'Weekdays', days: [0, 1, 2, 3, 4] },
  { label: 'Mon–Sat', days: [0, 1, 2, 3, 4, 5] },
  { label: 'Weekends', days: [5, 6] },
]

const FREQS = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'once', label: 'Once' },
]

// Fill in every rule field so switching between Weekly / Monthly / Once keeps sensible defaults,
// based on the day column the task was opened from.
function fullRule(rule, contextDate) {
  const ctxWeek = ymd(startOfWeek(contextDate))
  return {
    freq: 'weekly',
    days: [dayIndex(contextDate)],
    interval: 1,
    anchor: ctxWeek,
    monthMode: 'date',
    monthDay: contextDate.getDate(),
    nth: Math.min(Math.ceil(contextDate.getDate() / 7), 4),
    weekday: dayIndex(contextDate),
    date: ymd(contextDate),
    start: null,
    end: null,
    ...rule,
  }
}

// Keep only the fields that matter for the chosen frequency.
function cleanRule(r, original, contextDate) {
  const range = { start: r.start || null, end: r.end || null }
  if (r.freq === 'once') return { freq: 'once', date: r.date }
  if (r.freq === 'monthly') {
    return r.monthMode === 'weekday'
      ? { freq: 'monthly', monthMode: 'weekday', nth: Number(r.nth), weekday: Number(r.weekday), ...range }
      : { freq: 'monthly', monthMode: 'date', monthDay: Number(r.monthDay), ...range }
  }
  const interval = Math.max(1, Number(r.interval) || 1)
  // Changing "every N weeks" restarts the count from the week you're looking at.
  const anchor = interval !== (original.interval || 1) || original.freq !== 'weekly'
    ? ymd(startOfWeek(contextDate))
    : r.anchor
  return { freq: 'weekly', days: [...r.days].sort(), interval, anchor, ...range }
}

// The Weekly / Monthly / Once controls, shared by tasks and subtasks.
function RuleEditor({ rule, setRule, idPrefix, label = 'Repeats' }) {
  const setR = (field) => (e) => setRule((r) => ({ ...r, [field]: e.target.value || null }))
  const toggleDay = (i) =>
    setRule((r) => ({ ...r, days: r.days.includes(i) ? r.days.filter((x) => x !== i) : [...r.days, i] }))
  return (
    <>
      <div className="todo-field">
        <span>{label}</span>
        <div className="todo-tabs" role="radiogroup" aria-label={label}>
          {FREQS.map((f) => (
            <button
              key={f.value}
              type="button"
              role="radio"
              aria-checked={rule.freq === f.value}
              className={`todo-filter ${rule.freq === f.value ? 'todo-filter--on' : ''}`}
              onClick={() => setRule((r) => ({ ...r, freq: f.value }))}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {rule.freq === 'weekly' && (
        <div className="todo-rule">
          <label className="todo-inline">
            <span>Every</span>
            <input
              id={`${idPrefix}-interval`}
              type="number"
              min="1"
              max="12"
              className="todo-input todo-input--num"
              value={rule.interval}
              onChange={(e) => setRule((r) => ({ ...r, interval: e.target.value }))}
            />
            <span>{Number(rule.interval) === 1 ? 'week' : 'weeks'} on</span>
          </label>
          <div className="todo-daypick" role="group" aria-label="Days">
            {DAY_LETTERS.map((l, i) => (
              <button
                key={i}
                type="button"
                className={`todo-daychip ${rule.days.includes(i) ? 'todo-daychip--on' : ''}`}
                onClick={() => toggleDay(i)}
                aria-pressed={rule.days.includes(i)}
                aria-label={DAYS[i]}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="todo-presets">
            {PRESETS.map((p) => (
              <button key={p.label} type="button" className="todo-filter" onClick={() => setRule((r) => ({ ...r, days: p.days }))}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {rule.freq === 'monthly' && (
        <div className="todo-rule">
          <label className="todo-inline">
            <input
              type="radio"
              name={`${idPrefix}-month-mode`}
              checked={rule.monthMode === 'date'}
              onChange={() => setRule((r) => ({ ...r, monthMode: 'date' }))}
            />
            <span>On day</span>
            <input
              id={`${idPrefix}-monthday`}
              type="number"
              min="1"
              max="31"
              className="todo-input todo-input--num"
              value={rule.monthDay}
              onChange={(e) => setRule((r) => ({ ...r, monthMode: 'date', monthDay: e.target.value }))}
            />
            <span>of the month</span>
          </label>
          <label className="todo-inline">
            <input
              type="radio"
              name={`${idPrefix}-month-mode`}
              checked={rule.monthMode === 'weekday'}
              onChange={() => setRule((r) => ({ ...r, monthMode: 'weekday' }))}
            />
            <span>On the</span>
            <select
              id={`${idPrefix}-nth`}
              className="todo-input todo-input--auto"
              value={rule.nth}
              onChange={(e) => setRule((r) => ({ ...r, monthMode: 'weekday', nth: Number(e.target.value) }))}
            >
              {[1, 2, 3, 4, -1].map((n) => <option key={n} value={n}>{NTH_LABELS[n].toLowerCase()}</option>)}
            </select>
            <select
              id={`${idPrefix}-weekday`}
              className="todo-input todo-input--auto"
              value={rule.weekday}
              onChange={(e) => setRule((r) => ({ ...r, monthMode: 'weekday', weekday: Number(e.target.value) }))}
            >
              {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
            </select>
          </label>
        </div>
      )}

      {rule.freq === 'once' && (
        <label className="todo-field">
          <span>Date</span>
          <input id={`${idPrefix}-date`} type="date" className="todo-input" value={rule.date || ''} onChange={setR('date')} />
        </label>
      )}

      {rule.freq !== 'once' && (
        <div className="todo-field-row">
          <label className="todo-field">
            <span>Starts (optional)</span>
            <input id={`${idPrefix}-start`} type="date" className="todo-input" value={rule.start || ''} onChange={setR('start')} />
          </label>
          <label className="todo-field">
            <span>Ends (optional)</span>
            <input id={`${idPrefix}-end`} type="date" className="todo-input" value={rule.end || ''} onChange={setR('end')} />
          </label>
        </div>
      )}
    </>
  )
}

const ruleErrorFor = (rule) =>
  rule.freq === 'weekly' && rule.days.length === 0 ? 'Pick at least one day.'
    : rule.freq === 'once' && !rule.date ? 'Pick a date.'
      : rule.freq !== 'once' && rule.start && rule.end && rule.end < rule.start ? 'The end date is before the start date.'
        : ''

function TaskEditor({ task, contextDate, onSave, onDelete, onClose }) {
  const originalRule = getRule(task)
  // Each subtask carries `custom` (has its own schedule) and `_rule` (the editable schedule) while editing.
  const [draft, setDraft] = useState(() => ({
    ...task,
    subtasks: (task.subtasks || []).map((s) => ({ ...s, custom: !!s.rule, _rule: fullRule(s.rule, contextDate) })),
  }))
  const [rule, setRule] = useState(() => fullRule(originalRule, contextDate))
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (field) => (e) => setDraft((d) => ({ ...d, [field]: e.target.value }))

  const setSub = (id, field, value) =>
    setDraft((d) => ({ ...d, subtasks: d.subtasks.map((s) => (s.id === id ? { ...s, [field]: value } : s)) }))
  const setSubRule = (id) => (update) =>
    setDraft((d) => ({
      ...d,
      subtasks: d.subtasks.map((s) => (s.id === id ? { ...s, _rule: typeof update === 'function' ? update(s._rule) : update } : s)),
    }))
  const addSub = () =>
    setDraft((d) => ({
      ...d,
      subtasks: [...d.subtasks, { id: newId(), text: '', notes: '', done: {}, custom: false, _rule: fullRule(null, contextDate) }],
    }))
  const moveSub = (index, dir) =>
    setDraft((d) => ({ ...d, subtasks: arrayMove(d.subtasks, index, index + dir) }))
  const removeSub = (id) => setDraft((d) => ({ ...d, subtasks: d.subtasks.filter((s) => s.id !== id) }))

  const ruleError = ruleErrorFor(rule)
  const subError = draft.subtasks.some((s) => s.custom && s.text.trim() && ruleErrorFor(s._rule))
  const canSave = draft.title.trim() && !ruleError && !subError

  const save = (e) => {
    e.preventDefault()
    if (!canSave) return
    const { id, ...rest } = draft
    onSave(id, {
      ...rest,
      title: draft.title.trim(),
      rule: cleanRule(rule, originalRule, contextDate),
      subtasks: draft.subtasks
        .filter((s) => s.text.trim())
        .map(({ custom, _rule, ...s }) => ({
          ...s,
          text: s.text.trim(),
          rule: custom ? cleanRule(_rule, s.rule || {}, contextDate) : null,
        })),
    })
    onClose()
  }

  return (
    <div className="todo-modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="todo-modal" onSubmit={save} role="dialog" aria-label="Edit task">
        <div className="todo-modal-head">
          <h2>Edit task</h2>
          <button type="button" className="todo-delete" onClick={onClose} aria-label="Close">×</button>
        </div>

        <label className="todo-field">
          <span>Title</span>
          <input id="edit-title" className="todo-input" value={draft.title} onChange={set('title')} autoFocus />
        </label>

        <RuleEditor rule={rule} setRule={setRule} idPrefix="edit" />

        {ruleError && <p className="todo-error">{ruleError}</p>}

        <label className="todo-field">
          <span>Time (optional)</span>
          <input id="edit-time" type="time" className="todo-input" value={draft.time || ''} onChange={set('time')} />
        </label>

        <label className="todo-field">
          <span>Notes</span>
          <textarea id="edit-notes" className="todo-input" rows={2} value={draft.notes || ''} onChange={set('notes')} />
        </label>

        <div className="todo-field">
          <span>Subtasks</span>
          <div className="todo-edit-subs">
            {draft.subtasks.map((s, idx) => (
              <div key={s.id} className="todo-edit-sub">
                <div className="todo-edit-sub-inputs">
                  <input
                    id={`sub-${s.id}`}
                    className="todo-input"
                    value={s.text}
                    placeholder="Subtask"
                    onChange={(e) => setSub(s.id, 'text', e.target.value)}
                  />
                  <input
                    id={`sub-notes-${s.id}`}
                    className="todo-input todo-input--small"
                    value={s.notes || ''}
                    placeholder="Note (optional)"
                    onChange={(e) => setSub(s.id, 'notes', e.target.value)}
                  />
                  <label className="todo-inline todo-sub-repeat">
                    <span>Repeats</span>
                    <select
                      id={`sub-mode-${s.id}`}
                      className="todo-input todo-input--auto"
                      value={s.custom ? 'custom' : 'same'}
                      onChange={(e) => setSub(s.id, 'custom', e.target.value === 'custom')}
                    >
                      <option value="same">Same as task</option>
                      <option value="custom">Custom</option>
                    </select>
                  </label>
                  {s.custom && (
                    <div className="todo-sub-rule">
                      <RuleEditor rule={s._rule} setRule={setSubRule(s.id)} idPrefix={`sub-${s.id}`} label="Subtask repeats" />
                      {ruleErrorFor(s._rule) && <p className="todo-error">{ruleErrorFor(s._rule)}</p>}
                      <p className="todo-hint">Shows only on days the task is also on the board.</p>
                    </div>
                  )}
                </div>
                <div className="todo-sub-actions">
                  <button type="button" className="todo-move" onClick={() => moveSub(idx, -1)} disabled={idx === 0} aria-label="Move subtask up">↑</button>
                  <button type="button" className="todo-move" onClick={() => moveSub(idx, 1)} disabled={idx === draft.subtasks.length - 1} aria-label="Move subtask down">↓</button>
                  <button type="button" className="todo-delete" onClick={() => removeSub(s.id)} aria-label="Remove subtask">×</button>
                </div>
              </div>
            ))}
            <button type="button" className="todo-link" onClick={addSub}>+ Add subtask</button>
          </div>
        </div>

        <div className="todo-modal-actions">
          {confirmDelete ? (
            <button type="button" className="todo-btn todo-btn--danger" onClick={() => { onDelete(task.id); onClose() }}>
              Confirm delete{originalRule.freq !== 'once' ? ' (every repeat)' : ''}
            </button>
          ) : (
            <button type="button" className="todo-link" onClick={() => setConfirmDelete(true)}>Delete task</button>
          )}
          <button type="submit" className="todo-btn" disabled={!canSave}>Save</button>
        </div>
      </form>
    </div>
  )
}

// ── Board ─────────────────────────────────────────────────

export default function TodoBoard({ tasks, onAdd, onUpdate, onDelete, onSignOut }) {
  const [now] = useState(() => new Date())
  const [view, setView] = useState('board')
  const [weekOffset, setWeekOffset] = useState(0)
  // 'day' shows one day at a time (the default); 'week' shows all seven columns.
  // The choice is remembered on this device.
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem('todo-mode') || 'day' } catch { return 'day' }
  })
  const [dayOffset, setDayOffset] = useState(0)
  const [collapsed, setCollapsed] = useState(() => new Set())
  const [editing, setEditing] = useState(null) // { id, date }
  const boardRef = useRef(null)
  const todayRef = useRef(null)

  const today = addDays(now, 0) // midnight
  const todayKey = ymd(today)
  const selected = addDays(today, dayOffset)
  const weekStart = addDays(startOfWeek(today), 7 * weekOffset)
  const dates = mode === 'day' ? [selected] : DAYS.map((_, i) => addDays(weekStart, i))
  const stripStart = startOfWeek(selected)

  const switchMode = (m) => {
    if (m === mode) return
    if (m === 'week') {
      setWeekOffset(Math.round((stripStart - startOfWeek(today)) / (7 * 864e5)))
    } else {
      // Open the day view on today if it's in the week you were looking at, otherwise that week's Monday.
      const inWeek = ymd(startOfWeek(today)) === ymd(weekStart)
      setDayOffset(inWeek ? 0 : Math.round((weekStart - today) / 864e5))
    }
    setMode(m)
    try { localStorage.setItem('todo-mode', m) } catch { /* private window: just don't remember */ }
  }

  // Start scrolled to today's column
  useEffect(() => {
    const board = boardRef.current
    const col = todayRef.current
    if (board && col) board.scrollLeft = col.offsetLeft - board.offsetLeft - 16
  }, [view, mode])

  const dayLabel = (date) => {
    const key = ymd(date)
    if (key === todayKey) return 'Today'
    if (key === ymd(addDays(today, 1))) return 'Tomorrow'
    return shortDate(date)
  }
  const meta = (date, t) => [dayLabel(date), formatTime(t.time), repeatLabel(t)].filter(Boolean).join(', ')

  const toggleCollapsed = (id) =>
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // Checking a task checks that day's subtasks; checking the day's last subtask checks the task.
  const toggleTask = (t, date, key) => {
    const today = new Set(subsOn(t, date).map((s) => s.id))
    if (t.done?.[key]) {
      onUpdate(t.id, { done: withoutKey(t.done, key) })
    } else {
      onUpdate(t.id, {
        done: { ...(t.done || {}), [key]: true },
        subtasks: (t.subtasks || []).map((s) => (today.has(s.id) ? { ...s, done: { ...(s.done || {}), [key]: true } } : s)),
      })
    }
  }

  const toggleSub = (t, s, date, key) => {
    const today = new Set(subsOn(t, date).map((x) => x.id))
    const subtasks = t.subtasks.map((x) =>
      x.id !== s.id ? x : { ...x, done: x.done?.[key] ? withoutKey(x.done, key) : { ...(x.done || {}), [key]: true } },
    )
    const allDone = subtasks.filter((x) => today.has(x.id)).every((x) => x.done?.[key])
    onUpdate(t.id, {
      subtasks,
      done: allDone ? { ...(t.done || {}), [key]: true } : withoutKey(t.done, key),
    })
  }

  // New tasks repeat every week on that day until edited or deleted.
  const addTask = (date, title) => {
    const wk = ymd(startOfWeek(date))
    onAdd({
      title, notes: '', time: '',
      rule: { freq: 'weekly', days: [dayIndex(date)], interval: 1, anchor: wk, start: null, end: null },
      created: wk, done: {}, subtasks: [], order: Date.now(),
    })
  }

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 6 } }),
  )

  // Dropping a card gives it an `order` between its new neighbours in that column.
  // Order is shared across days, so the new position carries to every day the task is on.
  const reorder = (dayTasks, { active, over }) => {
    if (!over || active.id === over.id) return
    const ids = dayTasks.map((t) => t.id)
    const list = arrayMove(dayTasks, ids.indexOf(active.id), ids.indexOf(over.id))
    const at = list.findIndex((t) => t.id === active.id)
    const prev = list[at - 1]?.order
    const next = list[at + 1]?.order
    let order
    if (prev == null) order = next - 1000
    else if (next == null) order = prev + 1000
    else order = Math.floor((prev + next) / 2)

    if (prev != null && next != null && (order <= prev || order >= next)) {
      // No room between the neighbours: renumber every task, keeping this move.
      const all = [...tasks].sort(sortTasks).filter((t) => t.id !== active.id)
      const moved = tasks.find((t) => t.id === active.id)
      all.splice(all.findIndex((t) => t.id === list[at + 1].id), 0, moved)
      all.forEach((t, k) => { if (t.order !== (k + 1) * 1000) onUpdate(t.id, { order: (k + 1) * 1000 }) })
      return
    }
    onUpdate(active.id, { order })
  }

  const editingTask = editing && tasks.find((t) => t.id === editing.id)

  return (
    <div className="todo-shell">
      <header className="todo-topbar">
        <h1 className="todo-title">To do<span className="red-dot">.</span></h1>
        <div className="todo-tabs" role="tablist">
          {['board', 'progress'].map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              className={`todo-filter ${view === v ? 'todo-filter--on' : ''}`}
              onClick={() => setView(v)}
            >
              {v}
            </button>
          ))}
        </div>
        <button className="todo-link todo-signout" onClick={onSignOut}>Sign out</button>
      </header>

      {view === 'progress' ? (
        <TodoStats tasks={tasks} now={now} />
      ) : (
        <>
          <div className="todo-weeknav">
            {mode === 'day' ? (
              <>
                <button className="todo-navbtn" onClick={() => setDayOffset((d) => d - 1)} aria-label="Previous day">‹</button>
                <span className="todo-week">{DAYS[dayIndex(selected)]}, {shortDate(selected)}</span>
                <button className="todo-navbtn" onClick={() => setDayOffset((d) => d + 1)} aria-label="Next day">›</button>
                {dayOffset !== 0 && <button className="todo-link" onClick={() => setDayOffset(0)}>Today</button>}
              </>
            ) : (
              <>
                <button className="todo-navbtn" onClick={() => setWeekOffset((w) => w - 1)} aria-label="Previous week">‹</button>
                <span className="todo-week">Week of {shortDate(weekStart)} – {shortDate(addDays(weekStart, 6))}</span>
                <button className="todo-navbtn" onClick={() => setWeekOffset((w) => w + 1)} aria-label="Next week">›</button>
                {weekOffset !== 0 && <button className="todo-link" onClick={() => setWeekOffset(0)}>This week</button>}
              </>
            )}
            <div className="todo-tabs todo-mode" role="radiogroup" aria-label="View">
              {['day', 'week'].map((m) => (
                <button
                  key={m}
                  role="radio"
                  aria-checked={mode === m}
                  className={`todo-filter ${mode === m ? 'todo-filter--on' : ''}`}
                  onClick={() => switchMode(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {mode === 'day' && (
            <div className="todo-strip" role="group" aria-label="Pick a day">
              {DAYS.map((name, i) => {
                const date = addDays(stripStart, i)
                const key = ymd(date)
                const isSel = key === ymd(selected)
                return (
                  <button
                    key={name}
                    className={`todo-stripday ${isSel ? 'todo-stripday--on' : ''} ${key === todayKey ? 'todo-stripday--today' : ''}`}
                    onClick={() => setDayOffset(Math.round((date - today) / 864e5))}
                    aria-pressed={isSel}
                    aria-label={`${name} ${shortDate(date)}`}
                  >
                    <span>{DAY_LETTERS[i]}</span>
                    <strong>{date.getDate()}</strong>
                  </button>
                )
              })}
            </div>
          )}

          <div className={`todo-board ${mode === 'day' ? 'todo-board--day' : ''}`} ref={boardRef}>
            {dates.map((date) => {
              const key = ymd(date)
              const name = DAYS[dayIndex(date)]
              const isToday = key === todayKey
              const dayTasks = tasks.filter((t) => occursOn(t, date)).sort(sortTasks)
              return (
                <section
                  key={key}
                  className={`todo-col ${isToday ? 'todo-col--today' : ''}`}
                  ref={isToday ? todayRef : undefined}
                  aria-label={name}
                >
                  <div className="todo-col-head">
                    <h2 className="todo-col-name">{name}</h2>
                    <span className="todo-col-date">{shortDate(date)}</span>
                  </div>

                  <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={(e) => reorder(dayTasks, e)}>
                  <SortableContext items={dayTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
                  {dayTasks.map((t) => {
                    const subs = subsOn(t, date)
                    const open = !collapsed.has(t.id)
                    const done = !!t.done?.[key]
                    const subsDone = subs.filter((s) => s.done?.[key]).length
                    const edit = () => setEditing({ id: t.id, date })
                    return (
                      <SortableCard key={t.id} id={t.id}>
                        <div className={`todo-task todo-task--parent ${done ? 'todo-done' : ''}`}>
                          <Circle done={done} onClick={() => toggleTask(t, date, key)} label={`Mark ${t.title} ${done ? 'not done' : 'done'}`} />
                          <div className="todo-task-body">
                            <button className="todo-task-title" onClick={edit}>{t.title}</button>
                            <div className="todo-task-meta">{meta(date, t)}</div>
                            {t.notes && <div className="todo-task-notes">{t.notes}</div>}
                          </div>
                        </div>

                        {subs.length > 0 && (
                          <>
                            <button className="todo-subtoggle" onClick={() => toggleCollapsed(t.id)} aria-expanded={open}>
                              <span>
                                {open ? 'Hide' : 'Show'} {subs.length} Subtask{subs.length > 1 ? 's' : ''}
                                {subsDone > 0 && <span className="todo-subcount"> · {subsDone}/{subs.length} done</span>}
                              </span>
                              <span className={`todo-chevron ${open ? 'todo-chevron--open' : ''}`} aria-hidden="true">›</span>
                            </button>
                            {open && (
                              <ul className="todo-subs">
                                {subs.map((s) => {
                                  const sDone = !!s.done?.[key]
                                  return (
                                    <li key={s.id} className={`todo-task todo-sub ${sDone ? 'todo-done' : ''}`}>
                                      <Circle done={sDone} onClick={() => toggleSub(t, s, date, key)} label={`Mark ${s.text} ${sDone ? 'not done' : 'done'}`} />
                                      <div className="todo-task-body">
                                        <button className="todo-task-title" onClick={edit}>{s.text}</button>
                                        {s.rule && <div className="todo-task-meta">{ruleLabel(s.rule, { once: true })}</div>}
                                        {s.notes && <div className="todo-task-notes">{s.notes}</div>}
                                      </div>
                                    </li>
                                  )
                                })}
                              </ul>
                            )}
                          </>
                        )}
                      </SortableCard>
                    )
                  })}
                  </SortableContext>
                  </DndContext>

                  <AddTask dayName={name} onAdd={(title) => addTask(date, title)} />
                </section>
              )
            })}
          </div>
        </>
      )}

      {editingTask && (
        <TaskEditor
          key={editingTask.id}
          task={editingTask}
          contextDate={editing.date}
          onSave={onUpdate}
          onDelete={onDelete}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}
