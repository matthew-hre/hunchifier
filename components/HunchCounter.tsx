// a progress bar that shows how many hunches you have left. the goal is to have 50 hunches.

import { createClient } from "@/lib/supabase/server";

import { Progress } from "@/components/ui/progress";

export default async function HunchCounter() {
  const getHunches = async () => {
    "use server";

    const supabase = createClient();

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
    "use server";

    const supabase = createClient();

    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    return user_id;
  };

  const user_id = await getUserId();
  const hunchesLeft = await getHunches();

  return (
    <div className="relative w-full">
      <p className="relative text-center text-primary text-lg">
        {hunchesLeft !== 50
          ? hunchesLeft + " / 50 hunches made"
          : "50 hunches made!"}
      </p>
      <Progress className="w-full" value={Math.min(hunchesLeft ?? 0, 50) * 2} />
    </div>
  );
}
