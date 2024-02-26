import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import EditHunchFormClient from "./EditHunchFormClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getUserId } from "@/lib/supabase/utils";

export default async function EditHunch({
  params,
}: {
  params: { id: string };
}) {
  const userId = await getUserId();

  const getHunch = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("hunches")
      .select("*")
      .eq("id", params.id);

    if (error) {
      console.error(error);
      return;
    }

    return data[0];
  };

  const getDeeperHunch = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("hunches_ext")
      .select("*")
      .eq("hunchID", params.id);

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const updateHunch = async (formData: FormData) => {
    "use server";

    const tempSupabase = createClient();

    const problem = formData.get("problem") as string;
    const solution = formData.get("solution") as string;
    const client = formData.get("users") as string;

    const deeperHunchProblem = formData.get("deeperProblem") as string;
    const deeperHunchSolution = formData.get("deeperSolution") as string;
    const deeperHunchClient = formData.get("deeperUsers") as string;

    const hunch_id = params.id;

    const { error } = await tempSupabase
      .from("hunches")
      .update({
        possible_problem: problem,
        possible_solution: solution,
        possible_client: client,
        updated_at: new Date().toISOString(),
      })
      .eq("id", hunch_id);

    if (error) {
      console.error(error);
      return redirect("/edithunch?message=Invalid%20credentials");
    }

    const { error: deeperError } = await tempSupabase
      .from("hunches_ext")
      .update({
        problem: deeperHunchProblem,
        solution: deeperHunchSolution,
        client: deeperHunchClient,
      })
      .eq("hunchID", hunch_id);

    if (deeperError) {
      console.error(deeperError);
      return redirect("/edithunch?message=Invalid%20credentials");
    }

    return redirect("/app");
  };

  const hunch = await getHunch();

  const deeperHunch = await getDeeperHunch();

  const isHunchOwner = async () => {
    return hunch.user_id === userId;
  };

  const isOwner = await isHunchOwner();

  if (isOwner) {
    return (
      <EditHunchFormClient
        updateHunch={updateHunch}
        originalHunch={hunch}
        deeperHunch={deeperHunch}
      />
    );
  }

  return (
    <>
      <h1 className="text-2xl font-semibold text-primary text-center w-full">
        You are not authorized to edit this hunch
      </h1>
      <div className="w-full flex flex-row justify-center">
        <Link href="/app">
          <Button>Go Home</Button>
        </Link>
      </div>
    </>
  );
}
