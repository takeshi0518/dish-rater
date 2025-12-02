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