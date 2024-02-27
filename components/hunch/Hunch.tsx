import { createClient } from "@/lib/supabase/server";
import HunchClient from "./HunchClient";
import { redirect } from "next/navigation";

export default async function Hunch({ hunch }: { hunch: any }) {
  const getTimestamp = () => {
    // if there's no "last updated" date, return "created at" date
    if (!hunch.updated_at) {
      return "Created at " + formatDateTime(hunch.created_at);
    }

    return "Last updated at " + formatDateTime(hunch.updated_at);
  };

  const getDeeperHunch = async () => {
    const supabase = createClient();

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
  const timestamp = getTimestamp();

  return (
    <HunchClient
      deleteHunch={deleteHunch}
      hunch={hunch}
      deeperHunch={deeperHunch}
      timestamp={timestamp}
    />
  );
}

function formatDateTime(date: string) {
  const dateObj = new Date(date);
  const localDate = dateObj.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return localDate;
}

const deleteHunch = async (hunch_id: any) => {
  "use server";

  const supabase = createClient();

  const { error } = await supabase
    .from("hunches_ext")
    .delete()
    .eq("hunchID", hunch_id);

  if (error) {
    console.error(error);
    return;
  }

  const { error: error2 } = await supabase
    .from("hunches")
    .delete()
    .eq("id", hunch_id);

  if (error2) {
    console.error(error);
    return;
  }

  return redirect("/app");
};
