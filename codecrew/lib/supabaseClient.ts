import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cxtfirigocayekwlcfye.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4dGZpcmlnb2NheWVrd2xjZnllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczNDM5NDEsImV4cCI6MjA3MjkxOTk0MX0.W1gMLyixc4HLAeKkvlmb5dhEfQbFfWSdcvazyhkijsI!';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
