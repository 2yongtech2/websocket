
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://lpmamnlmrnsejdaydidt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbWFtbmxtcm5zZWpkYXlkaWR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU1MzMzOTQsImV4cCI6MjA1MTEwOTM5NH0.Iuug_6-OzL6N2F_X1V89DdmLbciE9NpJwlZxnHd5Iq0';

if (!supabaseUrl || !supabaseKey) {
  console.log('supabaseUrl', supabaseUrl);
  console.log('supabaseKey', supabaseKey);
  throw new Error('Supabase URL and Key must be provided');
}

export const supabase = createClient(supabaseUrl, supabaseKey);