import { createClient } from '@supabase/supabase-js'

// The URL and publishable (anon) key are safe to ship to the browser —
// access is enforced by Row Level Security in supabase/schema.sql.
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
)
