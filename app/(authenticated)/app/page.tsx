import { createClient } from "@/lib/supabase/server";

import { getUserId } from "@/lib/supabase/utils";
import HunchList from "./HunchList";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import HunchCounter from "@/components/HunchCounter";
import Hunch from "@/components/hunch/Hunch";

import { redirect } from "next/navigation";

export default async function Index() {
  const INITIAL_FETCH_LIMIT = 5;

  const hunches = await getHunches(0, INITIAL_FETCH_LIMIT);

  return (
    <>
      <Card className="flex flex-col items-center justify-center p-4 pt-2">
        <HunchCounter />
      </Card>
      <div className="flex flex-col items-center justify-center pb-4 px-2 pt-0 fixed bottom-0 left-0 z-10 w-full sm:static sm:p-0 bg-gradient-to-t from-background">
        <Card className="w-full">
          <Link href="/newhunch">
            <button
              type="submit"
              className="w-full flex flex-row items-center justify-center p-4 hover:bg-secondary transition-colors duration-200"
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
      <HunchList initialHunches={hunches} getHunches={getHunches} />
    </>
  );
}

async function getHunches(offset: number, limit: number) {
  "use server";

  const supabase = createClient();
  const userId = await getUserId();

  const { data, error } = await supabase
    .from("hunches")
    .select(
      "id, created_at, possible_problem, possible_solution, possible_client"
    )
    .eq("user_id", userId)
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
