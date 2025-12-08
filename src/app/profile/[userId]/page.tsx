import { createSupabaseServerClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

import ProfileContent from '@/components/profile/profile-content';

type Props = {
  params: {
    userId: string;
  };
};

export default async function ProfilePage({ params }: Props) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { userId } = await params;
  const isOwnProfile = user?.id === userId;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError || !profile) {
    notFound();
  }

  const { data: dishes } = await supabase
    .from('dishes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return (
    <ProfileContent
      profile={profile}
      dishes={dishes}
      isOwnProfile={isOwnProfile}
    />
  );
}
