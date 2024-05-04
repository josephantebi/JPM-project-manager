import { createClient } from "@supabase/supabase-js";
import key from "../private/supabase-key";

const supabaseUrl = "https://vhumzggnqikinlxmnbkb.supabase.co";
const supabaseKey = key;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
