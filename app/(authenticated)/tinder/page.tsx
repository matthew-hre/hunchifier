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
      .from("user_permissions")
      .select("tinder")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return;
    }

    if (!profiles || !profiles[0]?.tinder) {
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
    "use server";

    const supabase = createClient();

    const { data, error } = await supabase
      .from("tinder_totals")
      .select(
        "good_ratings, bad_ratings, funny_ratings, gpt_ratings, exists_ratings, what_ratings"
      )
      .eq("userID", userId)
      .single();

    if (error) {
      if (error.code !== "PGRST116") {
        console.error(error);
      }
      return {
        good_ratings: 0,
        bad_ratings: 0,
        funny_ratings: 0,
        gpt_ratings: 0,
        exists_ratings: 0,
        what_ratings: 0,
      };
    }

    return data;
  };

  await isUserAdmin();

  return (
    <>
      <Header />
      <TinderClient
        getExistingStats={getExistingStats}
        getRandomHunch={getRandomHunch}
        rateHunch={rateHunch}
      />
    </>
  );
}
