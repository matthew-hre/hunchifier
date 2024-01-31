import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

export default function Leaderboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

}
