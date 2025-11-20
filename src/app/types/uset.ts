import { User as SupabaseUser } from '@supabase/supabase-js';

export type User = SupabaseUser & {
  user_metadata?: {
    name?: string;
    avatar_url?: string;
    full_name?: string;
    [key: string]: any;
  };
};
