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
    '00000000-0000-0000-0000-000000000000'::UUID,
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
    '00000000-0000-0000-0000-000000000000'::UUID,
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
  );

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
    '00000000-0000-0000-0000-000000000000'::UUID,
    '00000000-0000-0000-0000-000000000000'::UUID,
    '00000000-0000-0000-0000-000000000000'::UUID,
    'email',
    jsonb_build_object(
      'sub', '00000000-0000-0000-0000-000000000000',
      'email', 'takeshi@example.com'
    ),
    NOW(),
    NOW(),
    NOW()
  ),
  (
    '11111111-1111-1111-1111-111111111111'::UUID,
    '11111111-1111-1111-1111-111111111111'::UUID,
    '11111111-1111-1111-1111-111111111111'::UUID,
    'email',
    jsonb_build_object(
      'sub', '11111111-1111-1111-1111-111111111111',
      'email', 'test@example.com'
    ),
    NOW(),
    NOW(),
    NOW()
  );

  
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
  ON CONFLICT (id) DO  NOTHING;

  INSERT INTO public.dishes (user_id, name, description, image_url, tags, rating, source_type, restaurant_name)
VALUES(
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