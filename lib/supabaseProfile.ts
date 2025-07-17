import { supabase } from './supabase';

export async function getUserProfile(userId: string) {
  return supabase
    .from('users')
    .select('*')
    .eq('id', userId);
}

export async function updateUserProfile(userId: string, data: any) {
  return supabase
    .from('users')
    .update(data)
    .eq('id', userId)
    .single();
}

export async function uploadAvatar(userId: string, file: File) {
  const fileExt = file.name.split('.').pop();
  const filePath = `avatars/${userId}.${fileExt}`;
  const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
  if (uploadError) return { error: uploadError };
  const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
  return { url: data.publicUrl };
}

export async function getUserStats(userId: string) {
  return supabase
    .from('users')
    .select('totalTips:totalTips, winRate:successRate, totalEarnings:totalWinnings, createdAt')
    .eq('id', userId)
    .single();
}

export async function getMonthlyPerformance(userId: string) {
  return supabase
    .rpc('get_monthly_performance', { user_id: userId });
}

export async function getRecentActivity(userId: string) {
  return supabase
    .from('raffle_tickets')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false })
    .limit(10);
}

export async function getUserRaffleHistory(userId: string) {
  return supabase
    .from('raffle_tickets')
    .select('*')
    .eq('userId', userId)
    .order('createdAt', { ascending: false });
}

export async function ensureUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id);

  if (!data || data.length === 0) {
    await supabase.from('users').insert([
      {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || '',
        // Add other default fields as needed
      }
    ]);
  }
} 