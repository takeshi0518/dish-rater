export type Dish = {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  tags: string[] | null;
  rating: number | null;
  source_type: 'restaurant' | 'homemade' | 'other';
  restaurant_name: string | null;
  chef_name: string | null;
  created_at: string;
  updated_at: string;
};

export type DishWithProfile = Dish & {
  profiles: {
    username: string;
    avatar_url: string | null;
  } | null;
};

export type Profile = {
  id: string;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};
