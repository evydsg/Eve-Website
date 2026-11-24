import { useState } from 'react'
import {
  DAYS, addDays, dayIndex, progressOn, shortDate, startOfWeek, ymd, isScheduled,
} from './todoUtils'

const pct = ({ done, total }) => (total ? done / total : null)
const pctText = (v) => (v == null ? '—' : `${Math.round(v * 100)}%`)

// Single-series vertical bar chart (0–100%), with hover/focus tooltip.
function BarChart({ data, label }) {
  const [hover, setHover] = useState(null)
  return (
    <div className="todo-chart" role="img" aria-label={label}>
      <div className="todo-chart-grid" aria-hidden="true">
        {[100, 50, 0].map((g) => (
          <div key={g} className="todo-chart-gridline"><span>{g}%</span></div>
        ))}
      </div>
      <div className="todo-chart-bars">
        {data.map((d, i) => (
          <div
            key={d.label + i}
            className="todo-chart-col"
            tabIndex={0}
            aria-label={d.tip}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(i)}
            onBlur={() => setHover(null)}
          >
            <div className="todo-chart-track">
              {d.value != null && (
                <div
                  className={`todo-chart-bar ${d.highlight ? 'todo-chart-bar--now' : ''}`}
                  style={{ height: `${Math.max(d.value * 100, 1.5)}%` }}
                />
              )}
              {hover === i && <div className="todo-chart-tip">{d.tip}</div>}
            </div>
            <div className={`todo-chart-label ${d.highlight ? 'todo-chart-label--now' : ''}`}>{d.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function TodoStats({ tasks, now }) {
  const weekStart = startOfWeek(now)
  const weekKey = ymd(weekStart)
  const todayIdx = dayIndex(now)

  // ── This week, day by day ──
  const week = DAYS.map((name, i) => {
    const date = addDays(weekStart, i)
    const p = progressOn(tasks, date)
    const future = i > todayIdx
    return {
      label: name.slice(0, 3),
      value: future ? null : pct(p),
      highlight: i === todayIdx,
      tip: future
        ? `${name} ${shortDate(date)} · ${p.total} planned`
        : `${name} ${shortDate(date)} · ${p.done} of ${p.total} done (${pctText(pct(p))})`,
      ...p,
      future,
    }
  })
  const soFar = week.filter((d) => !d.future)
  const weekTotals = soFar.reduce((a, d) => ({ done: a.done + d.done, total: a.total + d.total }), { done: 0, total: 0 })
  const today = week[todayIdx]

  // ── Last 8 weeks ──
  const weeks = Array.from({ length: 8 }, (_, k) => {
    const ws = addDays(weekStart, -7 * (7 - k))
    const isCurrent = k === 7
    const totals = DAYS.reduce((a, _d, i) => {
      if (isCurrent && i > todayIdx) return a
      const p = progressOn(tasks, addDays(ws, i))
      return { done: a.done + p.done, total: a.total + p.total }
    }, { done: 0, total: 0 })
    const v = pct(totals)
    return {
      label: `${ws.getMonth() + 1}/${ws.getDate()}`,
      value: v,
      highlight: isCurrent,
      tip: `Week of ${shortDate(ws)} · ${totals.done} of ${totals.total} done (${pctText(v)})${isCurrent ? ' so far' : ''}`,
    }
  })

  // ── Streak: consecutive days with everything done ──
  let streak = 0
  let cursor = now
  const t0 = progressOn(tasks, cursor)
  if (!(t0.total && t0.done === t0.total)) cursor = addDays(cursor, -1)
  for (let k = 0; k < 366; k++) {
    const p = progressOn(tasks, cursor)
    if (p.total && p.done === p.total) streak++
    else if (p.total) break
    cursor = addDays(cursor, -1)
  }

  // ── By task this week (up to today) ──
  const byTask = new Map()
  for (const t of tasks) {
    for (let i = 0; i <= todayIdx; i++) {
      if (!isScheduled(t, weekKey, i)) continue
      const key = ymd(addDays(weekStart, i))
      const subs = t.subtasks || []
      const row = byTask.get(t.title) || { done: 0, total: 0 }
      if (subs.length) {
        row.total += subs.length
        row.done += subs.filter((s) => s.done?.[key]).length
      } else {
        row.total += 1
        if (t.done?.[key]) row.done += 1
      }
      byTask.set(t.title, row)
    }
  }
  const taskRows = [...byTask.entries()].sort((a, b) => b[1].total - a[1].total)

  return (
    <div className="todo-stats">
      <div className="todo-tiles">
        <div className="todo-tile">
          <span className="todo-tile-label">This week so far</span>
          <span className="todo-tile-value">{pctText(pct(weekTotals))}</span>
          <span className="todo-tile-sub">{weekTotals.done} of {weekTotals.total} done</span>
        </div>
        <div className="todo-tile">
          <span className="todo-tile-label">Today</span>
          <span className="todo-tile-value">{today.done}<small> / {today.total}</small></span>
          <span className="todo-tile-sub">{today.total - today.done} left</span>
        </div>
        <div className="todo-tile">
          <span className="todo-tile-label">Perfect-day streak</span>
          <span className="todo-tile-value">{streak}<small> day{streak === 1 ? '' : 's'}</small></span>
          <span className="todo-tile-sub">Days with every task done</span>
        </div>
      </div>

      <div className="todo-panels">
        <section className="todo-panel">
          <h3>This week</h3>
          <p className="todo-panel-sub">Share of tasks done each day</p>
          <BarChart data={week} label="Completion by day this week" />
        </section>

        <section className="todo-panel">
          <h3>Last 8 weeks</h3>
          <p className="todo-panel-sub">Share of tasks done each week</p>
          <BarChart data={weeks} label="Completion by week, last 8 weeks" />
        </section>

        <section className="todo-panel todo-panel--wide">
          <h3>By task this week</h3>
          <p className="todo-panel-sub">Subtasks done so far, Monday through today</p>
          {taskRows.length === 0 && <p className="todo-muted">No tasks scheduled yet this week.</p>}
          <ul className="todo-hbars">
            {taskRows.map(([title, p]) => (
              <li key={title} className="todo-hbar">
                <span className="todo-hbar-name">{title}</span>
                <span className="todo-hbar-track">
                  <span className="todo-hbar-fill" style={{ width: `${(p.done / p.total) * 100}%` }} />
                </span>
                <span className="todo-hbar-value">{p.done}/{p.total}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
