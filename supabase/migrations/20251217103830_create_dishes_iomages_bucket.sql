INSERT INTO storage.buckets (id, name, public)
VALUES ('dishes', 'dishes', true);

-- 認証済みユーザーが自分の画像をアップロードできる
CREATE POLICY "User can upload their own dish images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'dishes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- 全員が画像を閲覧できる
CREATE POLICY "Anyone can view dish images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'dishes');

-- ユーザーは自分の画像を削除できる
CREATE POLICY "Users can delete their own dish images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'dishes' AND
  (storage.foldername(name))[1] = auth.uid()::text
);


