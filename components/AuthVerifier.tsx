"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthVerifier({
  requiresAdmin = false,
}: {
  requiresAdmin?: boolean;
}) {
  const supabase = createClient();

  const { user } = (await supabase.auth.getUser())?.data;

  if (user === null) {
    redirect("/login");
  }

  if (requiresAdmin) {
    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    const { data, error } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("user_id", user_id);

    if (error) {
      console.error(error);
      return;
    }

    if (data[0].is_admin === false) {
      redirect("/");
    }
  }

  return <></>;
}
