INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES
  (
    '00000000-0000-0000-0000-000000000000'::UUID,
    'takeshi@example.com',
    crypt('password123', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW()
  ),
  (
    '11111111-1111-1111-1111-111111111111'::UUID,
    'test@example.com',
    crypt('passwordtest', gen_salt('bf')),
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