CREATE TABLE public.dishes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  rating smallint check (rating >= 1 and rating <= 5),
  created_at timestampz default now() not null,
  updated_at timestampz default now() not null
);

-- RLSを有効化
alter table public.dishes enable row level security;