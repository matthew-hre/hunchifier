import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";
import { redirect } from "next/navigation";

import TinderClient from "./TinderClient";
import Header from "@/components/Header";

export default async function Tinder() {
  const userId = await getUserId();

  const isUserAdmin = async () => {
    const supabase = createClient();

    let { data: profiles, error } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return;
    }

    if (!profiles || !profiles[0]?.is_admin) {
      redirect("/app");
    }
  };

  const getRandomHunch = async () => {
    "use server";
    const supabase = createClient();

    const { data, error } = await supabase.rpc("get_random_hunch_for_user", {
      p_user_id: userId,
    });

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const rateHunch = async (hunchId: any, rating: string) => {
    "use server";

    const supabase = createClient();

    const { error } = await supabase.from("tinder").insert([
      {
        hunchID: hunchId,
        userID: userId,
        rating: rating,
      },
    ]);

    if (error) {
      console.error(error);
      return;
    }
  };

  const getExistingStats = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("tinder_totals")
      .select(
        "good_ratings, bad_ratings, funny_ratings, gpt_ratings, exists_ratings"
      )
      .eq("userID", userId);

    if (error) {
      console.error(error);
      return;
    }

    return data[0];
  };

  await isUserAdmin();
  const existingStats = await getExistingStats();

  return (
    <>
      <Header />
      <TinderClient
        existingStats={existingStats}
        getRandomHunch={getRandomHunch}
        rateHunch={rateHunch}
      />
    </>
  );
}
