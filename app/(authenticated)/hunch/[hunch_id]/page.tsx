import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";
import HunchPageClient from "./HunchPageClient";

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

  if (!hunch || hunch.user_id !== userId) {
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

  const getDiscoveries = async (deeper_id: any) => {
    const { data, error } = await supabase
      .from("discovery")
      .select("*")
      .eq("extHunchID", deeper_id);

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const getPersonas = async (deeper_id: any) => {
    const { data, error } = await supabase
      .from("personas")
      .select("*")
      .eq("deeperID", deeper_id);

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  if (deeperHunch) {
    const discoveries = await getDiscoveries(deeperHunch?.id);
    const personas = await getPersonas(deeperHunch?.id);

    return (
      <HunchPageClient
        hunch={hunch}
        timestamp={getTimestamp()}
        deeperHunch={deeperHunch}
        discoveries={discoveries}
        personas={personas}
      />
    );
  }

  return (
    <HunchPageClient
      hunch={hunch}
      timestamp={getTimestamp()}
      deeperHunch={deeperHunch}
    />
  );
}

function formatDateTime(created_at: any) {
  const date = new Date(created_at);
  return date.toLocaleString();
}
