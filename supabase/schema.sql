-- Private /todo page. Paste into Supabase → SQL Editor → New query → Run.

create table public.todos (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title       text not null,
  notes       text not null default '',
  time        text not null default '',          -- 'HH:MM' or ''
  days        smallint[] not null default '{}',  -- 0 = Monday … 6 = Sunday
  repeat      boolean not null default false,    -- true = every week
  week        text,                              -- Monday (YYYY-MM-DD) for one-off tasks
  created     text,                              -- Monday of the week it was created
  done        jsonb not null default '{}',       -- { "YYYY-MM-DD": true }
  subtasks    jsonb not null default '[]',       -- [{ id, text, notes, done: {...} }]
  sort_order  bigint not null default 0,
  created_at  timestamptz not null default now()
);

-- Row Level Security: a signed-in user can only touch their own rows.
-- (Sign-ups are turned off in the dashboard, so the only user is you.)
alter table public.todos enable row level security;

create policy "Read own todos"   on public.todos for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Add own todos"    on public.todos for insert to authenticated
  with check ((select auth.uid()) = user_id);
create policy "Edit own todos"   on public.todos for update to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Delete own todos" on public.todos for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Live sync between devices
alter publication supabase_realtime add table public.todos;
