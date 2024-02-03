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
      .from("user_hunch_count")
      .select("hunch_count")
      .eq("user_id", user_id);

    if (error) {
      console.error(error);
      return;
    }

    return data?.[0]?.hunch_count;
  };

  const getUserId = async () => {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    return user_id;
  };

  const user_id = await getUserId();
  const hunchesLeft = await getHunches();

  // a progress bar that shows how many hunches you have left. the goal is to have 50 hunches.
  if (user_id == "d06c8a7e-4820-488e-bd8c-d2ed90d44022") {
    // khalif has to do 200 hunches
    return (
      <div className="relative w-full">
        <p className="relative text-center text-primary text-lg">
          {hunchesLeft !== 50
            ? hunchesLeft + " / 200 hunches made. Cope."
            : "200 hunches made. I hate you."}
        </p>
        <Progress
          className="w-full"
          value={Math.min(hunchesLeft ?? 0, 200) / 2}
        />
      </div>
    );
  } else {
    return (
      <div className="relative w-full">
        <p className="relative text-center text-primary text-lg">
          {hunchesLeft !== 50
            ? hunchesLeft + " / 50 hunches made"
            : "50 hunches made!"}
        </p>
        <Progress
          className="w-full"
          value={Math.min(hunchesLeft ?? 0, 50) * 2}
        />
      </div>
    );
  }
}
