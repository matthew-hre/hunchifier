import { createClient } from "@/lib/supabase/server";

import { Card } from "@/components/ui/card";

import { getUserId } from "@/lib/supabase/utils";

export default async function Leaderboard() {
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

  const getProfiles = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("user_hunch_count")
      .select("user_id, first_name, last_name, hunch_count")
      .order("hunch_count", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const getBadge = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return index + 1 + "th";
  };

  const getColor = (index: number, isUser: boolean) => {
    if (index === 0) return "border-yellow-200 border-4";
    if (index === 1) return "border-gray-200 border-4";
    if (isUser) return "border-blue-200 border-4";
    return "";
  };

  const profiles = await getProfiles();

  return (
    <div className="flex flex-col w-full gap-2">
      {profiles?.map((profile: any, index: number) => {
        const isWinner = index < 3;
        const isUser = profile.user_id === userId;

        return (
          <Card
            key={profile.user_id}
            className={`flex items-center p-4 ${
              isWinner ? "flex-col" : "flex-row"
            } ${getColor(index, isUser)}`}
          >
            <div className="flex flex-col items-center justify-center mr-4">
              <h2
                className={`font-bold text-primary ${
                  isWinner ? "text-4xl" : "bg-secondary text-lg"
                } rounded-full p-6 w-8 h-8 flex items-center justify-center`}
              >
                {getBadge(index)}
              </h2>
            </div>
            <div
              className={`flex flex-col ${
                isWinner ? "items-center" : "items-left"
              } justify-center mr-4`}
            >
              <p
                className={`font-bold text-primary ${
                  index < 3 ? "text-xl" : "text-md"
                }`}
              >
                {profile.first_name} {profile.last_name}
              </p>
              <p className="text-sm text-primary">
                {isAdmin || isUser ? profile.hunch_count : "???"} hunches
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
