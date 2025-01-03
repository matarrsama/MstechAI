import { supabase } from '../lib/supabase';

export async function saveMessage({ userId, content, isUser }) {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      { user_id: userId, content, is_user: isUser }
    ])
    .select();
  
  if (error) throw error;
  return data[0];
}

export async function fetchMessages(userId) {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  
  if (error) throw error;
  return data;
}