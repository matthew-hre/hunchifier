import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";
import { redirect } from "next/navigation";

import EditHunchFormClient from "./DeeperHunchFormClient";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DeeperHunch({
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

  const createDeeperHunch = async (formData: FormData) => {
    "use server";

    const tempSupabase = createClient();

    const problem = formData.get("problem") as string;
    const solution = formData.get("solution") as string;
    const client = formData.get("users") as string;
    const hunch_id = params.id;

    const { error } = await tempSupabase.from("hunches_ext").insert([
      {
        problem: problem,
        solution: solution,
        client: client,
        hunchID: hunch_id,
      },
    ]);

    if (error) {
      console.error(error);
      return redirect("/edithunch?message=Invalid%20credentials");
    }

    return redirect("/hunch/" + hunch_id);
  };

  const isHunchOwner = async () => {
    return hunch.user_id === userId;
  };

  const hunch = await getHunch();

  const isOwner = await isHunchOwner();

  if (isOwner) {
    <>
      <h1 className="text-2xl font-semibold text-primary text-center w-full">
        You are not authorized to edit this hunch
      </h1>
      <div className="w-full flex flex-row justify-center">
        <Link href="/app">
          <Button>Go Home</Button>
        </Link>
      </div>
    </>;
  }

  return (
    <EditHunchFormClient
      createDeeperHunch={createDeeperHunch}
      originalHunch={hunch}
    />
  );
}
