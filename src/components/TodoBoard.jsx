import { useEffect, useRef, useState } from 'react'
import {
  DAYS, DAY_LETTERS, addDays, dayIndex, formatTime, isScheduled, newId,
  repeatLabel, shortDate, sortTasks, startOfWeek, ymd,
} from './todoUtils'
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

function TaskEditor({ task, onSave, onDelete, onClose }) {
  const [draft, setDraft] = useState(() => ({ ...task, days: task.days || [], subtasks: task.subtasks || [] }))
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const set = (field) => (e) =>
    setDraft((d) => ({ ...d, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const toggleDay = (i) =>
    setDraft((d) => ({
      ...d,
      days: d.days.includes(i) ? d.days.filter((x) => x !== i) : [...d.days, i].sort(),
    }))

  const setSub = (id, field, value) =>
    setDraft((d) => ({ ...d, subtasks: d.subtasks.map((s) => (s.id === id ? { ...s, [field]: value } : s)) }))
  const addSub = () =>
    setDraft((d) => ({ ...d, subtasks: [...d.subtasks, { id: newId(), text: '', notes: '', done: {} }] }))
  const removeSub = (id) => setDraft((d) => ({ ...d, subtasks: d.subtasks.filter((s) => s.id !== id) }))

  const canSave = draft.title.trim() && draft.days.length > 0

  const save = (e) => {
    e.preventDefault()
    if (!canSave) return
    const { id, ...rest } = draft
    onSave(id, {
      ...rest,
      title: draft.title.trim(),
      subtasks: draft.subtasks.filter((s) => s.text.trim()).map((s) => ({ ...s, text: s.text.trim() })),
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

        <div className="todo-field">
          <span>Days</span>
          <div className="todo-daypick" role="group" aria-label="Days">
            {DAY_LETTERS.map((l, i) => (
              <button
                key={i}
                type="button"
                className={`todo-daychip ${draft.days.includes(i) ? 'todo-daychip--on' : ''}`}
                onClick={() => toggleDay(i)}
                aria-pressed={draft.days.includes(i)}
                aria-label={DAYS[i]}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="todo-presets">
            {PRESETS.map((p) => (
              <button key={p.label} type="button" className="todo-filter" onClick={() => setDraft((d) => ({ ...d, days: p.days }))}>
                {p.label}
              </button>
            ))}
          </div>
          {draft.days.length === 0 && <p className="todo-error">Pick at least one day.</p>}
        </div>

        <label className="todo-toggle">
          <input id="edit-repeat" type="checkbox" checked={!!draft.repeat} onChange={set('repeat')} />
          <span>Repeat every week</span>
        </label>

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
            {draft.subtasks.map((s) => (
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
                </div>
                <button type="button" className="todo-delete" onClick={() => removeSub(s.id)} aria-label="Remove subtask">×</button>
              </div>
            ))}
            <button type="button" className="todo-link" onClick={addSub}>+ Add subtask</button>
          </div>
        </div>

        <div className="todo-modal-actions">
          {confirmDelete ? (
            <button type="button" className="todo-btn todo-btn--danger" onClick={() => { onDelete(task.id); onClose() }}>
              Confirm delete{task.days?.length > 1 ? ' from all days' : ''}
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
  const [collapsed, setCollapsed] = useState(() => new Set())
  const [editingId, setEditingId] = useState(null)
  const boardRef = useRef(null)
  const todayRef = useRef(null)

  const weekStart = addDays(startOfWeek(now), 7 * weekOffset)
  const weekKey = ymd(weekStart)
  const todayIdx = weekOffset === 0 ? dayIndex(now) : -1

  // Start scrolled to today's column
  useEffect(() => {
    const board = boardRef.current
    const col = todayRef.current
    if (board && col) board.scrollLeft = col.offsetLeft - board.offsetLeft - 16
  }, [view])

  const dayLabel = (i) => {
    if (i === todayIdx) return 'Today'
    if (todayIdx >= 0 && i === todayIdx + 1) return 'Tomorrow'
    return shortDate(addDays(weekStart, i))
  }
  const meta = (i, t) => [dayLabel(i), formatTime(t.time), repeatLabel(t)].filter(Boolean).join(', ')

  const toggleCollapsed = (id) =>
    setCollapsed((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // Checking a task checks all its subtasks; checking the last subtask checks the task.
  const toggleTask = (t, key) => {
    const subs = t.subtasks || []
    if (t.done?.[key]) {
      onUpdate(t.id, { done: withoutKey(t.done, key) })
    } else {
      onUpdate(t.id, {
        done: { ...(t.done || {}), [key]: true },
        subtasks: subs.map((s) => ({ ...s, done: { ...(s.done || {}), [key]: true } })),
      })
    }
  }

  const toggleSub = (t, s, key) => {
    const subtasks = t.subtasks.map((x) =>
      x.id !== s.id ? x : { ...x, done: x.done?.[key] ? withoutKey(x.done, key) : { ...(x.done || {}), [key]: true } },
    )
    const allDone = subtasks.every((x) => x.done?.[key])
    onUpdate(t.id, {
      subtasks,
      done: allDone ? { ...(t.done || {}), [key]: true } : withoutKey(t.done, key),
    })
  }

  const addTask = (day, title) =>
    onAdd({
      title, notes: '', time: '', days: [day], repeat: false, week: weekKey, created: weekKey,
      done: {}, subtasks: [], order: Date.now(),
    })

  const editing = tasks.find((t) => t.id === editingId)

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
            <button className="todo-navbtn" onClick={() => setWeekOffset((w) => w - 1)} aria-label="Previous week">‹</button>
            <span className="todo-week">Week of {shortDate(weekStart)} – {shortDate(addDays(weekStart, 6))}</span>
            <button className="todo-navbtn" onClick={() => setWeekOffset((w) => w + 1)} aria-label="Next week">›</button>
            {weekOffset !== 0 && <button className="todo-link" onClick={() => setWeekOffset(0)}>This week</button>}
          </div>

          <div className="todo-board" ref={boardRef}>
            {DAYS.map((name, i) => {
              const key = ymd(addDays(weekStart, i))
              const dayTasks = tasks.filter((t) => isScheduled(t, weekKey, i)).sort(sortTasks)
              return (
                <section
                  key={name}
                  className={`todo-col ${i === todayIdx ? 'todo-col--today' : ''}`}
                  ref={i === todayIdx ? todayRef : undefined}
                  aria-label={name}
                >
                  <div className="todo-col-head">
                    <h2 className="todo-col-name">{name}</h2>
                    <span className="todo-col-date">{shortDate(addDays(weekStart, i))}</span>
                  </div>

                  {dayTasks.map((t) => {
                    const subs = t.subtasks || []
                    const open = !collapsed.has(t.id)
                    const done = !!t.done?.[key]
                    const subsDone = subs.filter((s) => s.done?.[key]).length
                    return (
                      <article key={t.id} className="todo-group">
                        <div className={`todo-task todo-task--parent ${done ? 'todo-done' : ''}`}>
                          <Circle done={done} onClick={() => toggleTask(t, key)} label={`Mark ${t.title} ${done ? 'not done' : 'done'}`} />
                          <div className="todo-task-body">
                            <button className="todo-task-title" onClick={() => setEditingId(t.id)}>{t.title}</button>
                            <div className="todo-task-meta">{meta(i, t)}</div>
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
                                      <Circle done={sDone} onClick={() => toggleSub(t, s, key)} label={`Mark ${s.text} ${sDone ? 'not done' : 'done'}`} />
                                      <div className="todo-task-body">
                                        <button className="todo-task-title" onClick={() => setEditingId(t.id)}>{s.text}</button>
                                        {s.notes && <div className="todo-task-notes">{s.notes}</div>}
                                      </div>
                                    </li>
                                  )
                                })}
                              </ul>
                            )}
                          </>
                        )}
                      </article>
                    )
                  })}

                  <AddTask dayName={name} onAdd={(title) => addTask(i, title)} />
                </section>
              )
            })}
          </div>
        </>
      )}

      {editing && (
        <TaskEditor
          key={editing.id}
          task={editing}
          onSave={onUpdate}
          onDelete={onDelete}
          onClose={() => setEditingId(null)}
        />
      )}
    </div>
  )
}
