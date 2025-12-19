-- 新規ユーザー作成時にprofilesレコードを自動作成
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN

  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
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
  END IF;

  RETURN NEW;
  END;
  $$;