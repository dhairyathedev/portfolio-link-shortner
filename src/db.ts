import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  "SUPABASE_URL",
  "SUPABASE_ANON_KEY",
);

export default supabase;
