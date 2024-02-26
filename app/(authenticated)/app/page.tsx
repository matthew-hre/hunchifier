import { createClient } from "@/lib/supabase/server";
import Hunch from "@/components/Hunch";

import Link from "next/link";

import { FiPlus } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import HunchCounter from "@/components/HunchCounter";

import { getUserId } from "@/lib/supabase/utils";

export default async function Index() {
  const userId = await getUserId();

  const getHunches = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("hunches")
      .select(
        "id, created_at, possible_problem, possible_solution, possible_client"
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const hunches = await getHunches();

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
      {hunches?.map((hunch) => (
        <Hunch key={hunch.id} hunch={hunch} />
      ))}
    </>
  );
}
