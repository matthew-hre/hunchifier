import { createClient } from "@/lib/supabase/server";

import { Card } from "@/components/ui/card";

import Header from "@/components/Header";

import SEO from "@/components/SEO";
import { redirect } from "next/navigation";

export default async function Leaderboard() {
  const getAdmin = async () => {
    const supabase = createClient();
    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    const { data, error } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("user_id", user_id);

    if (error) {
      console.error(error);
      return;
    }

    return data[0].is_admin;
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

  const getUserId = async () => {
    const supabase = createClient();

    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    if (!user_id) {
      return redirect("/login");
    }

    return user_id;
  };

  const getBadge = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return index + 1 + "th";
  };

  const getColor = (index: number, isUser: boolean) => {
    if (index === 0) return "bg-yellow-200";
    if (index === 1) return "bg-gray-200";
    if (isUser) return "bg-blue-200";
    return "";
  };

  const profiles = await getProfiles();
  const userId = await getUserId();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <SEO pageTitle="Hunchifier" pageDescription="Leaderboard" />
      <Header />
      <div className="w-full max-w-2xl py-2 space-y-2 border-top border-secondary mt-14">
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
                    isWinner ? "text-4xl" : "bg-gray-200 text-lg"
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
    </div>
  );
}
