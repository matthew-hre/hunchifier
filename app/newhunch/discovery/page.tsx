import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import HunchFormClient from "./DiscoveryFormClient";
import Header from "@/components/Header";
import DiscoveryFormClient from "./DiscoveryFormClient";

export default function newHunch() {
  const createHunch = async (formData: FormData) => {
    "use server";

    const possible_problem = formData.get("problem") as string;
    const possible_solution = formData.get("solution") as string;
    const possible_client = formData.get("users") as string;
    const supabase = createClient();
    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    const { error } = await supabase.from("hunches").insert([
      {
        possible_problem,
        possible_solution,
        possible_client,
        user_id,
      },
    ]);

    if (error) {
      console.error(error);
      return redirect("/newhunch?message=Invalid%20credentials");
    }

    return redirect("/login");
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="w-full max-w-2xl pt-4 py-2 space-y-2 border-top border-secondary mt-14 h-auto">
        <DiscoveryFormClient createHunch={createHunch} />
      </div>
    </div>
  );
}
