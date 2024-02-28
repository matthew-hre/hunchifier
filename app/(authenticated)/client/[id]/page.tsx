import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import ClientClient from "./ClientClient";

export default async function CreateClient({
  params,
}: {
  params: { id: string };
}) {
  const getHunchId = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("hunches_ext")
      .select("hunchID")
      .eq("id", params.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const hunch_id = await getHunchId();

  const createDiscovery = async (formData: FormData) => {
    "use server";

    const supabase = createClient();

    const deeper_hunch_id = params.id;
    const problem = formData.get("problem") as string;
    const solution = formData.get("solution") as string;
    const notes = formData.get("notes") as string;

    const { error } = await supabase.from("discovery").insert([
      {
        problem,
        solution,
        notes,
        extHunchID: deeper_hunch_id,
      },
    ]);

    if (error) {
      console.error(error);
      return redirect(
        "/client/" + deeper_hunch_id + "?message=Invalid%20credentials"
      );
    }

    return redirect("/hunch/" + hunch_id?.hunchID);
  };

  const createPersona = async (formData: FormData) => {
    "use server";

    const supabase = createClient();

    const deeper_hunch_id = params.id;
    const description = formData.get("description") as string;
    const psychological = formData.get("psycho") as string;
    const pains = formData.get("pains") as string;
    const jobs = formData.get("jobs") as string;

    const { error } = await supabase.from("personas").insert([
      {
        user_description: description,
        psycho_info: psychological,
        pains,
        jobs_to_be_done: jobs,
        deeperID: deeper_hunch_id,
      },
    ]);

    if (error) {
      console.error(error);
      return redirect(
        "/client/" + deeper_hunch_id + "?message=Invalid%20credentials"
      );
    }

    return redirect("/hunch/" + hunch_id?.hunchID);
  };

  return (
    <ClientClient
      createDiscovery={createDiscovery}
      createPersona={createPersona}
    />
  );
}
