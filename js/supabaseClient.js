import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://zyyrmedbihwyxmhgudvz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5eXJtZWRiaWh3eXhtaGd1ZHZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5ODYxMjgsImV4cCI6MjA3MTU2MjEyOH0.RZnBj4wjNbE3BsX15HW_hQZPncJp21Ns_3S29proWnA";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);