import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";
import Hunch from "@/components/Hunch";

export default async function HunchPage({
  params: { hunch_id },
}: {
  params: { hunch_id: string };
}) {
  const supabase = createClient();
  const userId = await getUserId();

  const getHunch = async () => {
    const { data, error } = await supabase
      .from("detailed_hunches")
      .select("*")
      .eq("id", hunch_id);

    if (error) {
      console.error(error);
      return;
    }

    return data[0];
  };

  const hunch = await getHunch();

  if (hunch.user_id !== userId) {
    redirect("/app");
  }

  const getTimestamp = () => {
    if (!hunch.updated_at) {
      return "Created at " + formatDateTime(hunch.created_at);
    }

    return "Last updated at " + formatDateTime(hunch.updated_at);
  };

  const getDeeperHunch = async () => {
    const { data, error } = await supabase
      .from("hunches_ext")
      .select("id, problem, solution, client")
      .eq("hunchID", hunch.id);

    if (error) {
      console.error(error);
      return;
    }

    return data[0];
  };

  const deeperHunch = await getDeeperHunch();

  const deleteHunch = async () => {
    const { error } = await supabase
      .from("hunches_ext")
      .delete()
      .eq("hunchID", hunch.id);

    if (error) {
      console.error(error);
      return;
    }

    const { error: error2 } = await supabase
      .from("hunches")
      .delete()
      .eq("id", hunch.id);

    if (error2) {
      console.error(error);
      return;
    }

    return redirect("/app");
  };

  return <Hunch hunch={hunch} />;
}

function formatDateTime(created_at: any) {
  const date = new Date(created_at);
  return date.toLocaleString();
}
