import { createClient } from '@supabase/supabase-js';

const supabaseUrl: string  = 'https://fojrhumfkvkivwdjahpf.supabase.co';
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvanJodW1ma3ZraXZ3ZGphaHBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0OTc4OTQsImV4cCI6MjA2ODA3Mzg5NH0.LQnmQG8ZDtTj8ldv15TbsI-zom9C-BuN6ZLLoOMaTdw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
