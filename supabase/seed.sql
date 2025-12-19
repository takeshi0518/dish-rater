-- supabase/seed.sql

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ========================================
-- トリガーを一時的に削除
-- ========================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- ========================================
-- DO $$ ブロック開始
-- ========================================
DO $$
DECLARE
  instance_uuid UUID;
BEGIN
  -- instance_idを取得
  SELECT instance_id INTO instance_uuid FROM auth.users LIMIT 1;

  IF instance_uuid IS NULL THEN
    instance_uuid := '00000000-0000-0000-0000-000000000000'::UUID;
  END IF;

  -- auth.usersに挿入
  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    aud,
    role,
    created_at,
    updated_at,
    confirmation_token,
    recovery_token,
    email_change_token_new
  )
  VALUES
    (
      '00000000-0000-0000-0000-000000000000'::UUID,
      instance_uuid,
      'takeshi@example.com',
      crypt('password123', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      'authenticated',
      'authenticated',
      NOW(),
      NOW(),
      '',
      '',
      ''
    ),
    (
      '11111111-1111-1111-1111-111111111111'::UUID,
      instance_uuid,
      'test@example.com',
      crypt('passwordtest', gen_salt('bf')),
      NOW(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{}'::jsonb,
      'authenticated',
      'authenticated',
      NOW(),
      NOW(),
      '',
      '',
      ''
    )
  ON CONFLICT (id) DO NOTHING;

  -- auth.identitiesに挿入
  INSERT INTO auth.identities (
    id,
    user_id,
    provider_id,
    provider,
    identity_data,
    last_sign_in_at,
    created_at,
    updated_at
  )
  VALUES
    (
      gen_random_uuid(),
      '00000000-0000-0000-0000-000000000000'::UUID,
      '00000000-0000-0000-0000-000000000000'::text,
      'email',
      jsonb_build_object(
        'sub', '00000000-0000-0000-0000-000000000000',
        'email', 'takeshi@example.com',
        'email_verified', true
      ),
      NOW(),
      NOW(),
      NOW()
    ),
    (
      gen_random_uuid(),
      '11111111-1111-1111-1111-111111111111'::UUID,
      '11111111-1111-1111-1111-111111111111'::text,
      'email',
      jsonb_build_object(
        'sub', '11111111-1111-1111-1111-111111111111',
        'email', 'test@example.com',
        'email_verified', true
      ),
      NOW(),
      NOW(),
      NOW()
    )
  ON CONFLICT (id) DO NOTHING;
END $$;
-- ========================================
-- DO $$ ブロック終了
-- ========================================

-- profilesに挿入
INSERT INTO profiles (id, username, avatar_url, bio)
VALUES
  (
    '00000000-0000-0000-0000-000000000000'::UUID,
    'takeshi',
    '',
    '食べるのが大好きです！'
  ),
  (
    '11111111-1111-1111-1111-111111111111'::UUID,
    'testuser',
    '',
    'テストユーザーです。美味しいものが大好き！'
  )
ON CONFLICT (id) DO NOTHING;

-- dishesに挿入
INSERT INTO public.dishes (user_id, name, description, image_url, tags, rating, source_type, restaurant_name)
VALUES
  (
    '00000000-0000-0000-0000-000000000000',
    'カレーライス',
    '中辛のビーフカレー。スパイスが効いていて美味しい。',
    null,
    ARRAY['カレー', '辛い', 'ランチ'],
    5,
    'restaurant',
    '美味しいカレー屋'
  ),
  (
    '11111111-1111-1111-1111-111111111111',
    '中華そば',
    '昔ながらの中華そば。醤油豚骨ベースの美味しいスープ。麺はストレートでチャーシューはしっとりジューシー。呑んだあとの締めにちょうど良く、翌日の胃もたれが無い。',
    null,
    ARRAY['ラーメン', '中華そば', '締めのラーメン'],
    5,
    'restaurant',
    '美味しいラーメン屋'
  );

-- ========================================
-- トリガーを再作成
-- ========================================
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();