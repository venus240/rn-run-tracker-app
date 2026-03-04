import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dknxrcvhacknapjnikcc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrbnhyY3ZoYWNrbmFwam5pa2NjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1OTc3MzEsImV4cCI6MjA4ODE3MzczMX0.BQLs29I7KzSzE3xuNZitgft-4nmW2nrv5QrsSsvDr_8';

export const supabase = createClient(supabaseUrl, supabaseKey)