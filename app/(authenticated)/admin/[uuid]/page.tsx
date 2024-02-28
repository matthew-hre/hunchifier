import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FiArrowLeft } from "react-icons/fi";
import AdminHunch from "./AdminHunch";

export default async function AdminPanel({
  params,
}: {
  params: { uuid: string };
}) {
  const supabase = createClient();
  const userId = await getUserId();

  let { data: profiles, error } = await supabase
    .from("user_permissions")
    .select("admin")
    .eq("user_id", userId);

  if (error) {
    console.error(error);
    return;
  }

  if (!profiles || !profiles[0]?.admin) {
    redirect("/app");
  }

  async function getDeeperHunches() {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("detailed_hunches")
      .select(
        "id, created_at, possible_problem, possible_solution, possible_client, deeper_id, deeper_problem, deeper_solution, deeper_client"
      )
      .eq("user_id", params.uuid)
      .not("deeper_id", "is", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const hunches = data.map((hunch) => {
      return hunch;
    });

    return hunches;
  }

  async function getHunches() {
    "use server";

    const supabase = createClient();

    const { data, error } = await supabase
      .from("detailed_hunches")
      .select(
        "id, created_at, possible_problem, possible_solution, possible_client, deeper_id"
      )
      .eq("user_id", params.uuid)
      .is("deeper_id", null)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    const hunches = data.map((hunch) => {
      return hunch;
    });

    return hunches;
  }

  const hunches = await getHunches();
  const deeperHunches = await getDeeperHunches();

  // matthew, in case you try and delete this again, no, we do need it, if the user
  // doesn't have a hunch, we still need their name. dummy.
  const getUser = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("first_name, last_name")
      .eq("user_id", params.uuid)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const user = await getUser();

  return (
    <div className="absolute top-0 left-0 p-12 px-4 md:px-12 w-full flex flex-col items-center min-h-screen">
      <div className="flex flex-col items-center w-full">
        <header className="flex items-center justify-center w-full mt-8 px-4 py-2 border-b border-secondary">
          <p className="text-primary">
            Viewing hunches for {user?.first_name} {user?.last_name}
          </p>
          <Link href="/admin" className="absolute left-12 top-16">
            <p className="text-primary hover:underline">
              <FiArrowLeft className="inline" />
            </p>
          </Link>
        </header>
      </div>
      <div className="space-y-2 w-full mb-4">
        {deeperHunches?.map((hunch: any) => {
          return <AdminHunch hunch={hunch} key={hunch.id} />;
        })}
      </div>
      <p className="text-md text-primary my-4 text-center lg:mt-0 lg:text-left">
        Recent Hunches
      </p>
      <div className="space-y-2 w-full">
        {hunches?.map((hunch: any) => {
          return <AdminHunch hunch={hunch} key={hunch.id} />;
        })}
      </div>
    </div>
  );
}
