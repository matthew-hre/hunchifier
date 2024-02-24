import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";
import { redirect } from "next/navigation";

import EditHunchFormClient from "./DeeperHunchFormClient";
import Header from "@/components/Header";
import SEO from "@/components/SEO";
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

    return redirect("/app");
  };

  const isHunchOwner = async () => {
    return hunch.user_id === userId;
  };

  const hunch = await getHunch();

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
            createDeeperHunch={createDeeperHunch}
            originalHunch={hunch}
          />
        </div>
      )}
    </div>
  );
}
