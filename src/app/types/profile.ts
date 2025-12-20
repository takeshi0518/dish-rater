export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfilePageData = {
  id: string;
  username: string;
  avatar_url: string;
  bio: string | null;
};
