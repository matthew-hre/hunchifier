import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import EditHunchFormClient from "./EditHunchFormClient";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function EditHunch({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();

  const getUserId = async () => {
    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    if (!user_id) {
      return redirect("/login");
    }

    return user_id;
  };

  const getHunch = async () => {
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

    return redirect("/");
  };

  const hunch = await getHunch();

  const deeperHunch = await getDeeperHunch();

  const isHunchOwner = async () => {
    const user_id = await getUserId();
    return hunch.user_id === user_id;
  };

  const isOwner = await isHunchOwner();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <SEO pageTitle="Hunchifier" pageDescription="Create a new hunch" />
      <Header />
      {!isOwner ? (
        <div className="w-full max-w-2xl pt-4 py-2 space-y-2 border-top border-secondary flex flex-col items-center align-middle mt-14 h-auto">
          <h1 className="text-2xl font-semibold text-primary text-center w-full">
            You are not authorized to edit this hunch
          </h1>
          <div className="w-full flex flex-row justify-center">
            <Link href="/">
              <Button>Go Home</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl pt-4 py-2 space-y-2 border-top border-secondary mt-14 h-auto">
          <EditHunchFormClient
            updateHunch={updateHunch}
            originalHunch={hunch}
            deeperHunch={deeperHunch}
          />
        </div>
      )}
    </div>
  );
}
