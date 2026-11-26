import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../supabase'
import TodoBoard from './TodoBoard.jsx'
import './Todo.css'

// Database row <-> task object used by TodoBoard (shape in todoUtils.js)
const fromRow = (r) => ({
  id: r.id,
  title: r.title,
  notes: r.notes ?? '',
  time: r.time ?? '',
  days: r.days ?? [],
  rule: r.rule ?? null,
  repeat: r.repeat,
  week: r.week,
  created: r.created,
  done: r.done ?? {},
  subtasks: r.subtasks ?? [],
  order: r.sort_order,
})

const toRow = (task) => {
  const row = {}
  for (const [key, value] of Object.entries(task)) {
    if (key === 'id') continue
    row[key === 'order' ? 'sort_order' : key] = value
  }
  return row
}

function Todo() {
  const [session, setSession] = useState(undefined) // undefined = still checking
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  // ── AUTH ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  const userId = session?.user?.id

  // ── LOAD + LIVE SYNC (phone ↔ laptop) ──
  const load = useCallback(async () => {
    const { data, error: err } = await supabase.from('todos').select('*')
    if (err) setError(err.message)
    else setTasks(data.map(fromRow))
  }, [])

  useEffect(() => {
    if (!userId) return
    load()
    const channel = supabase
      .channel('todos-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'todos' }, load)
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [userId, load])

  // Changes show instantly, then save; on failure we reload from the database.
  const checkSaved = ({ error: err }) => {
    if (err) {
      setError(err.message)
      load()
    }
  }

  const sendLink = async (e) => {
    e.preventDefault()
    setError('')
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/todo` },
    })
    if (err) setError(/signup/i.test(err.message) ? 'That email can’t sign in here.' : err.message)
    else setSent(true)
  }

  // ── STATES ──
  if (session === undefined) {
    return <section className="todo-page"><p className="todo-muted">Loading…</p></section>
  }

  if (!session) {
    return (
      <section className="todo-page">
        <div className="todo-card todo-gate">
          <h1 className="todo-title">Private<span className="red-dot">.</span></h1>
          {sent ? (
            <p className="todo-muted">Check your email for a sign-in link.</p>
          ) : (
            <>
              <p className="todo-muted">This page is just for Eve.</p>
              <form className="todo-signin" onSubmit={sendLink}>
                <input
                  id="signin-email"
                  type="email"
                  className="todo-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="todo-btn" type="submit">Email me a sign-in link</button>
              </form>
            </>
          )}
          {error && <p className="todo-error">{error}</p>}
        </div>
      </section>
    )
  }

  return (
    <>
      <TodoBoard
        tasks={tasks}
        onAdd={async (task) => {
          const { data, error: err } = await supabase.from('todos').insert(toRow(task)).select().single()
          if (err) setError(err.message)
          else setTasks((ts) => (ts.some((t) => t.id === data.id) ? ts : [...ts, fromRow(data)]))
        }}
        onUpdate={(id, patch) => {
          setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)))
          supabase.from('todos').update(toRow(patch)).eq('id', id).then(checkSaved)
        }}
        onDelete={(id) => {
          setTasks((ts) => ts.filter((t) => t.id !== id))
          supabase.from('todos').delete().eq('id', id).then(checkSaved)
        }}
        onSignOut={() => supabase.auth.signOut()}
      />
      {error && <p className="todo-error todo-error--float">{error}</p>}
    </>
  )
}

export default Todo
