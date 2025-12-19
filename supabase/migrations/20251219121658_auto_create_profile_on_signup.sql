-- 新規ユーザー作成時にprofilesレコードを自動作成
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, created_at, updated_at)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'user_name',
      NEW.raw_user_meta_data->>'name',
      'user_' || substr(NEW.id::text, 1, 8)
    ),
    NOW(),
    NOW()
  );
  RETURN NEW;
  END;
  $$;

-- トリガー: auth.usersにINSERTされたら関数を実行
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();