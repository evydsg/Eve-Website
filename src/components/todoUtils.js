// Shared helpers for the private /todo page.
//
// Task shape (one Firestore doc in `todos`):
// {
//   title, notes, time ('HH:MM' or ''),
//   days:    [0..6]            which weekdays it shows on (0 = Monday)
//   repeat:  true | false      true = every week on those days
//   week:    'YYYY-MM-DD'      Monday of the week it belongs to (one-off tasks)
//   created: 'YYYY-MM-DD'      Monday of the week it was created (history starts here)
//   done:    { 'YYYY-MM-DD': true }    dates it was checked off
//   subtasks: [{ id, text, notes, done: { 'YYYY-MM-DD': true } }]
//   order
// }
// Completion is stored per date, so repeating tasks start fresh every day
// and the Progress charts can look back through history.

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
export const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const pad = (n) => String(n).padStart(2, '0')
export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const shortDate = (d) => `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(2)}`
export const newId = () => Math.random().toString(36).slice(2, 10)
export const dayIndex = (d) => (d.getDay() + 6) % 7 // Monday = 0

export function addDays(d, n) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  x.setDate(x.getDate() + n)
  return x
}

export const startOfWeek = (d) => addDays(d, -dayIndex(d))

export function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`
}

export function repeatLabel(t) {
  if (!t.repeat) return ''
  const days = t.days || []
  if (days.length === 7) return 'Daily'
  if (days.length === 5 && [0, 1, 2, 3, 4].every((d) => days.includes(d))) return 'Weekdays'
  return 'Weekly'
}

export const isScheduled = (t, weekKey, dayIdx) =>
  (t.days || []).includes(dayIdx) &&
  (t.repeat ? !t.created || weekKey >= t.created : t.week === weekKey)

/** How many checkable items were scheduled / done on one date.
 *  A task with subtasks counts its subtasks; otherwise it counts itself. */
export function progressOn(tasks, date) {
  const weekKey = ymd(startOfWeek(date))
  const idx = dayIndex(date)
  const key = ymd(date)
  let done = 0
  let total = 0
  for (const t of tasks) {
    if (!isScheduled(t, weekKey, idx)) continue
    const subs = t.subtasks || []
    if (subs.length) {
      total += subs.length
      done += subs.filter((s) => s.done?.[key]).length
    } else {
      total += 1
      if (t.done?.[key]) done += 1
    }
  }
  return { done, total }
}

export const sortTasks = (a, b) =>
  (a.time || '99:99').localeCompare(b.time || '99:99') || (a.order ?? 0) - (b.order ?? 0)
