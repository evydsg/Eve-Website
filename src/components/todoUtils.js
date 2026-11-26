// Shared helpers for the private /todo page.
//
// Task shape (one row in the `todos` table):
// {
//   title, notes, time ('HH:MM' or ''),
//   rule: {                       when the task happens
//     freq: 'weekly' | 'monthly' | 'once',
//     days: [0..6],               weekly: which weekdays (0 = Monday)
//     interval: 1,                weekly: every N weeks
//     anchor: 'YYYY-MM-DD',       weekly: a Monday the every-N-weeks count starts from
//     monthMode: 'date' | 'weekday',
//     monthDay: 1..31,            monthly 'date': e.g. the 15th
//     nth: 1..4 | -1,             monthly 'weekday': first … fourth, -1 = last
//     weekday: 0..6,              monthly 'weekday': which day (0 = Monday)
//     date: 'YYYY-MM-DD',         once: the date
//     start, end: 'YYYY-MM-DD' | null   optional range for weekly/monthly
//   },
//   created: 'YYYY-MM-DD'         Monday of the week it was created (history starts here)
//   done:    { 'YYYY-MM-DD': true }    dates it was checked off
//   subtasks: [{ id, text, notes, done: { 'YYYY-MM-DD': true },
//                rule: null (= same days as the task) or a rule like above }]
//   order
// }
// Completion is stored per date, so repeating tasks start fresh every day
// and the Progress charts can look back through history.

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
export const DAY_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
export const NTH_LABELS = { 1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', [-1]: 'Last' }

const pad = (n) => String(n).padStart(2, '0')
export const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const parseYmd = (s) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
export const shortDate = (d) => `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(2)}`
export const newId = () => Math.random().toString(36).slice(2, 10)
export const dayIndex = (d) => (d.getDay() + 6) % 7 // Monday = 0
const daysInMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()

export function addDays(d, n) {
  const x = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  x.setDate(x.getDate() + n)
  return x
}

export const startOfWeek = (d) => addDays(d, -dayIndex(d))

const weeksBetween = (a, b) => Math.round((startOfWeek(b) - startOfWeek(a)) / (7 * 864e5))

export function formatTime(t) {
  if (!t) return ''
  const [h, m] = t.split(':').map(Number)
  return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`
}

const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

/** The task's repeat rule (older tasks without one are converted on the fly). */
export function getRule(t) {
  if (t.rule) return t.rule
  if (t.repeat === false && t.week) {
    return { freq: 'weekly', days: t.days || [], interval: 1, anchor: t.week, start: t.week, end: ymd(addDays(parseYmd(t.week), 6)) }
  }
  return { freq: 'weekly', days: t.days || [], interval: 1, anchor: t.created || null, start: null, end: null }
}

/** Does a repeat rule land on this date? `created` = first week the item exists. */
export function ruleOccursOn(r, date, created) {
  const key = ymd(date)

  if (r.freq === 'once') return key === r.date

  if (created && key < created) return false
  if (r.start && key < r.start) return false
  if (r.end && key > r.end) return false

  if (r.freq === 'monthly') {
    if (r.monthMode === 'weekday') {
      if (dayIndex(date) !== r.weekday) return false
      if (r.nth === -1) return date.getDate() + 7 > daysInMonth(date)
      return Math.ceil(date.getDate() / 7) === r.nth
    }
    return date.getDate() === Math.min(r.monthDay || 1, daysInMonth(date))
  }

  // weekly
  if (!(r.days || []).includes(dayIndex(date))) return false
  const interval = r.interval || 1
  if (interval === 1) return true
  const anchor = r.anchor || r.start || created
  if (!anchor) return true
  const diff = weeksBetween(parseYmd(anchor), date)
  return ((diff % interval) + interval) % interval === 0
}

/** Does this task show up on this date? */
export const occursOn = (t, date) => ruleOccursOn(getRule(t), date, t.created)

/** The subtasks that show up on this date. A subtask with no rule of its own
 *  follows its task; one with a rule only shows on days both land on. */
export const subsOn = (t, date) =>
  occursOn(t, date)
    ? (t.subtasks || []).filter((s) => !s.rule || ruleOccursOn(s.rule, date, t.created))
    : []

/** Short description of how a rule repeats, e.g. "Every 2 weeks" or "Monthly, first Monday". */
export function ruleLabel(r, { once = false } = {}) {
  let label = ''
  if (r.freq === 'once') return once && r.date ? `On ${shortDate(parseYmd(r.date))}` : ''
  if (r.freq === 'monthly') {
    label = r.monthMode === 'weekday'
      ? `Monthly, ${NTH_LABELS[r.nth].toLowerCase()} ${DAYS[r.weekday]}`
      : `Monthly on the ${ordinal(r.monthDay || 1)}`
  } else {
    const days = r.days || []
    const interval = r.interval || 1
    if (interval > 1) label = `Every ${interval} weeks`
    else if (days.length === 7) label = 'Daily'
    else if (days.length === 5 && [0, 1, 2, 3, 4].every((d) => days.includes(d))) label = 'Weekdays'
    else if (once) label = days.length === 1 ? `${DAYS[days[0]]}s` : days.map((d) => DAYS[d].slice(0, 3)).join(', ')
    else label = 'Weekly'
  }
  if (r.end) label += ` until ${shortDate(parseYmd(r.end))}`
  return label
}

export const repeatLabel = (t) => ruleLabel(getRule(t))

/** How many checkable items were scheduled / done on one date.
 *  A task with subtasks counts its subtasks; otherwise it counts itself. */
export function progressOn(tasks, date) {
  const key = ymd(date)
  let done = 0
  let total = 0
  for (const t of tasks) {
    if (!occursOn(t, date)) continue
    const subs = subsOn(t, date)
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

// Tasks show in the order you drag them into; new ones go to the bottom.
export const sortTasks = (a, b) => (a.order ?? 0) - (b.order ?? 0)
