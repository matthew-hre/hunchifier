// a progress bar that shows how many hunches you have left. the goal is to have 50 hunches.

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import { Progress } from "@/components/ui/progress";

export default async function HunchCounter() {
  const getHunches = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    const { data, error } = await supabase
      .from("hunches")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    const requiredHunches = 50;

    const hunchesMade = data?.length ?? 0;

    if (error) {
      console.error(error);
      return;
    }

    return Math.min(hunchesMade, 50);
  };

  const hunchesLeft = await getHunches();

  // a progress bar that shows how many hunches you have left. the goal is to have 50 hunches.
  return (
    <div className="relative w-full">
      <p className="relative text-center text-primary text-lg">
        {hunchesLeft !== 50
          ? hunchesLeft + " / 50 hunches made"
          : "50 hunches made!"}
      </p>
      <Progress className="w-full" value={(hunchesLeft ?? 0) * 2} />
    </div>
  );
}
