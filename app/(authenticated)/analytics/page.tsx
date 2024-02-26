"use server";
import AnalyticsClient from "./AnalyticsClient";
import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";

export default async function AnalyticsServer(props: any) {
  const supabase = createClient();
  const userId = await getUserId();

  const getAdmin = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("user_permissions")
      .select("leaderboard")
      .eq("user_id", userId);

    if (error) {
      console.error(error);
      return false;
    }

    if (data.length === 0) return false;

    return data[0].leaderboard;
  };

  const isAdmin = await getAdmin();

  // select * from daily_rankings in the analytics schema

  const { data: hourlyData, error: hourlyError } = await supabase
    .from("hourly_rankings_12_hours")
    .select("first_name, date, rank");

  if (hourlyError) {
    console.error(hourlyError);
  }

  const { data: dailyData, error: dailyError } = await supabase
    .from("daily_rankings")
    .select("first_name, date, rank");

  if (dailyError) {
    console.error(dailyError);
  }

  return (
    <AnalyticsClient
      hourlyData={hourlyData}
      dailyData={dailyData}
      isAdmin={isAdmin}
    />
  );
}
