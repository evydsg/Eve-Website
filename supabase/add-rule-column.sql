-- Run once in Supabase → SQL Editor if your todos table was created before repeat options existed.
alter table public.todos add column if not exists rule jsonb;
-- Tell the API about the new column right away
notify pgrst, 'reload schema';
