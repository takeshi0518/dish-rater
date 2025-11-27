-- 既存のテーブルを削除
DROP TABLE IF EXISTS public.dishes CASCADE;

-- 新しいテーブル構造
CREATE TABLE public.dishes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  description text,
  image_url text,
  tags text[],
  rating smallint check (rating >= 1 and rating <= 5),

  -- 料理のソース情報
  source_type text not null check (source_type in ('restaurant', 'homemade', 'other')),
  restaurant_name text,
  chef_name text,

  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- RLSを有効化
ALTER TABLE public.dishes enable row level security;

-- ポリシー: 誰でも料理を閲覧できる
CREATE POLICY "Anyone can view dishes"
  on public.dishes
  for select
  using(true);

-- ポリシー: ログインユーザーは料理を追加できる
CREATE POLICY "Authenticated users can insert dishes"
  on public.dishes
  for insert
  with check (auth.uid() = user_id);

-- ポリシー: 自分の料理だけ更新できる
CREATE POLICY "Users can update their own dishes"
  on public.dishes
  for update
  using(auth.uid() = user_id);

-- ポリシー: 自分の料理だけ削除できる
CREATE POLICY "Users can delete their own dishes"
  on public.dishes
  for delete
  using(auth.uid() = user_id);

-- updated_atを自動更新するトリガー
CREATE OR REPLACE FUNCTION public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

CREATE TRIGGER set_updated_at
  before update on public.dishes
  for each row
  execute function public.handle_updated_at();
