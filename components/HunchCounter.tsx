// a progress bar that shows how many hunches you have left. the goal is to have 50 hunches.

import { createClient } from "@/lib/supabase/server";

import { Progress } from "@/components/ui/progress";
import { getUserId } from "@/lib/supabase/utils";

export default async function HunchCounter() {
  const userId = await getUserId();

  const getHunchCounts = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("user_hunch_count")
      .select("hunch_count, extended_count")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return;
    }

    return data?.[0];
  };

  const getHunches = async () => {
    const hunchCounts = await getHunchCounts();

    return hunchCounts?.hunch_count ?? 0;
  };

  const getExtendedHunches = async () => {
    const hunchCounts = await getHunchCounts();

    return hunchCounts?.extended_count ?? 0;
  };

  const hunchesLeft = await getHunches();
  const extendedHunches = await getExtendedHunches();

  return (
    <div className="relative w-full">
      <p className="relative text-center text-primary text-lg">
        {hunchesLeft !== 50
          ? hunchesLeft + " / 50 hunches made"
          : "50 hunches made!"}
      </p>
      <Progress className="w-full" value={Math.min(hunchesLeft ?? 0, 50) * 2} />
      {extendedHunches > 0 ? (
        <>
          <p className="relative text-center text-primary text-lg mt-4">
            {extendedHunches !== 5
              ? extendedHunches + " / 5 deeper hunches made"
              : "5 deeper hunches made!"}
          </p>
          <Progress
            className="w-full"
            value={Math.min(extendedHunches ?? 0, 5) * 20}
          />
        </>
      ) : null}
    </div>
  );
}
