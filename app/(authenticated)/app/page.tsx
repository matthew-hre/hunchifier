import { createClient } from "@/lib/supabase/server";

import { getUserId } from "@/lib/supabase/utils";
import HunchList from "./HunchList";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import Hunch from "@/components/hunch/Hunch";

export default async function Index() {
  const INITIAL_FETCH_LIMIT = 5;

  const hunches = await getHunches(0, INITIAL_FETCH_LIMIT);
  const deeperHunches = await getDeeperHunches();

  const userId = await getUserId();

  const getHunchCounts = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("user_hunch_count")
      .select("hunch_count, extended_count")
      .eq("user_id", userId)
      .single();

    if (error) {
      if (error.code !== "PGRST116") {
        console.error(error);
      }
      return {
        hunch_count: "?",
        extended_count: "?",
      };
    }

    return data;
  };

  const getHunchCount = async () => {
    const hunchCounts = await getHunchCounts();

    return hunchCounts?.hunch_count ?? 0;
  };

  const getExtendedHunchCount = async () => {
    const hunchCounts = await getHunchCounts();

    return hunchCounts?.extended_count ?? 1;
  };

  const hunchesLeft = await getHunchCount();
  const extendedHunches = await getExtendedHunchCount();

  return (
    <div className="absolute w-full h-full left-0 px-2 space-y-2">
      <div className="space-y-2 lg:space-x-2 lg:space-y-0 lg:flex lg:flex-row">
        <div className="flex flex-col items-center justify-center pb-4 px-2 pt-0 fixed bottom-0 left-0 z-10 w-full sm:static sm:p-0 bg-gradient-to-t from-background">
          <Card className="w-full lg:h-full">
            <Link href="/newhunch">
              <button
                type="submit"
                className="w-full h-full flex flex-row items-center justify-center p-4 hover:bg-secondary transition-colors duration-200"
              >
                <FiPlus size={20} />
                <span
                  className="ml-2
              text-md font-semibold text-primary
              "
                >
                  New Hunch
                </span>
              </button>
            </Link>
          </Card>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:space-x-2">
        <div className="w-full lg:w-1/2 xl:w-1/3 p-0 lg:p-12 mb-4">
          <p className="text-lg font-semibold text-primary my-4 text-center lg:mt-0 lg:text-left">
            Deeper Hunches{" "}
            <span className="text-muted-foreground font-normal text-md">
              ({extendedHunches} / 5)
            </span>
          </p>
          <div className="space-y-2">
            {extendedHunches == 0 ? (
              <p className="text-muted-foreground text-md text-center my-8">
                You haven&apos;t made any deeper hunches yet.
              </p>
            ) : (
              deeperHunches
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 xl:w-2/3 p-0 lg:p-12 space-y-4">
          <p className="text-lg font-semibold text-primary mb-4 text-center lg:text-left">
            Recent Hunches{" "}
            <span className="text-muted-foreground font-normal text-md">
              ({hunchesLeft} / 50)
            </span>
          </p>
          <HunchList initialHunches={hunches} getHunches={getHunches} />
        </div>
      </div>
    </div>
  );
}

async function getDeeperHunches() {
  const supabase = createClient();
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("detailed_hunches")
    .select(
      "id, created_at, possible_problem, possible_solution, possible_client, deeper_id"
    )
    .eq("user_id", userId)
    .not("deeper_id", "is", null)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const hunches = data.map((hunch) => {
    return <Hunch key={hunch.id} hunch={hunch} />;
  });

  return hunches;
}

async function getHunches(offset: number, limit: number) {
  "use server";

  const supabase = createClient();
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("detailed_hunches")
    .select(
      "id, created_at, possible_problem, possible_solution, possible_client, deeper_id"
    )
    .eq("user_id", userId)
    .is("deeper_id", null)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error(error);
    return;
  }

  const hunches = data.map((hunch) => {
    return <Hunch key={hunch.id} hunch={hunch} />;
  });

  return hunches;
}
