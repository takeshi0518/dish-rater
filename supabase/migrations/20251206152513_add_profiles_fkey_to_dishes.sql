ALTER TABLE dishes
ADD CONSTRAINT dishes_user_id_profiles_fkey
FOREIGN KEY (user_id)
REFERENCES profiles(id)
ON DELETE CASCADE;