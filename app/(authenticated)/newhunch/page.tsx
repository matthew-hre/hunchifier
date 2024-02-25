import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import HunchFormClient from "./HunchFormClient";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import { getUserId } from "@/lib/supabase/utils";

export default async function newHunch() {
  const userId = await getUserId();

  const createHunch = async (formData: FormData) => {
    "use server";

    const possible_problem = formData.get("problem") as string;
    const possible_solution = formData.get("solution") as string;
    const possible_client = formData.get("users") as string;

    const supabase = createClient();

    const { error } = await supabase.from("hunches").insert([
      {
        possible_problem,
        possible_solution,
        possible_client,
        user_id: userId,
      },
    ]);

    if (error) {
      console.error(error);
      return redirect("/newhunch?message=Invalid%20credentials");
    }

    return redirect("/app");
  };

  const createDeeperHunch = async (formData: FormData) => {
    "use server";

    // first just add the hunch
    const possible_problem = formData.get("problem") as string;
    const possible_solution = formData.get("solution") as string;
    const possible_client = formData.get("users") as string;

    const supabase = createClient();

    const { data, error } = await supabase
      .from("hunches")
      .insert([
        {
          possible_problem,
          possible_solution,
          possible_client,
          user_id: userId,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      return redirect("/newhunch?message=Invalid%20credentials");
    }

    return redirect("/deeper/" + data[0].id);
  };

  return (
    <HunchFormClient
      createHunch={createHunch}
      createDeeperHunch={createDeeperHunch}
    />
  );
}
