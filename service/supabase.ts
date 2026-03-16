import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bavhvjlrmdsvbnqjwrvk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhdmh2amxybWRzdmJucWp3cnZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NDc0MjAsImV4cCI6MjA4OTIyMzQyMH0.6vJtilALyGKixucjM8CPpon5BeQYob1KPolIdS4WzRY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
