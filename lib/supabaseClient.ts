import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://zcazqatjnzjyornokgbk.supabase.co";       // from Supabase dashboard
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjYXpxYXRqbnpqeW9ybm9rZ2JrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIwMjQ4NDksImV4cCI6MjA4NzYwMDg0OX0.JnIkWxo7wfARVJ0uPF3vuCCplH1mSLZR8eF9VxQEWjo";      // from Supabase dashboard

export const supabase = createClient(supabaseUrl, supabaseAnonKey);