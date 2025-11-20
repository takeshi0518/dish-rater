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
ALTER TABLE public.dishes enable row level security;

-- ポリシー: 誰でも料理を閲覧できる
CREATE POLICY "Anyone can view dishes"
  on public.dishes
  for select
  using(true);