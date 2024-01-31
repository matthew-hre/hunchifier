import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

import { Card } from "@/components/ui/card";

import Header from "@/components/Header";

import { redirect } from "next/navigation";

export default async function Leaderboard() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { user } = (await supabase.auth.getUser())?.data;

  if (user === null) {
    redirect("/login");
  }

  const getAdmin = async () => {
    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user_id);

    if (error) {
      console.error(error);
      return;
    }

    return data[0].is_admin;
  };

  const isAdmin = await getAdmin();

  const getProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) {
      console.error(error);
      return;
    }

    const profilePromises = data.map(async (profile) => {
      const { data: hunchesData, error: hunchesError } = await supabase
        .from("hunches")
        .select("*", { count: "exact" })
        .eq("user_id", profile.user_id);

      if (hunchesError) {
        console.error(hunchesError);
        return;
      }

      profile.hunches_count = hunchesData?.length;
      return profile;
    });

    const profilesWithHunchCounts = await Promise.all(profilePromises);

    return profilesWithHunchCounts;
  };

  const sortedProfiles = await getProfiles().then((profiles) => {
    return profiles?.sort((a, b) => {
      return b.hunches_count - a.hunches_count;
    });
  });

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="w-full max-w-2xl py-2 space-y-2 border-top border-secondary mt-14">
        {sortedProfiles && (
          <>
            <FancyCard
              profile={sortedProfiles[0]}
              place={1}
              isAdmin={isAdmin}
              user_id={user.id}
            />
            <FancyCard
              profile={sortedProfiles[1]}
              place={2}
              isAdmin={isAdmin}
              user_id={user.id}
            />
            <FancyCard
              profile={sortedProfiles[2]}
              place={3}
              isAdmin={isAdmin}
              user_id={user.id}
            />
          </>
        )}
        {sortedProfiles?.map((profile: any) => {
          // skip the first three profiles
          if (profile.user_id === sortedProfiles[0].user_id) return;
          if (profile.user_id === sortedProfiles[1].user_id) return;
          if (profile.user_id === sortedProfiles[2].user_id) return;

          return (
            <Card
              key={profile.user_id}
              className={`flex flex-row items-center p-4 ${
                profile.user_id === user.id ? "bg-blue-200" : "bg-white"
              }`}
            >
              <div className="flex flex-col items-center justify-center mr-4">
                <h2
                  className="text-lg font-bold text-primary bg-gray-200 rounded-full p-6 w-8 h-8 flex items-center justify-center"
                  style={{ textAlign: "center" }}
                >
                  {sortedProfiles.indexOf(profile) + 1}th
                </h2>
              </div>
              <div className="flex flex-col items-left justify-center mr-4">
                <p className="text-md font-bold text-primary">
                  {profile.first_name} {profile.last_name}
                </p>
                <p className="text-sm text-primary">
                  {isAdmin || profile.user_id === user.id
                    ? profile.hunches_count
                    : "???"}{" "}
                  hunches
                </p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function FancyCard({
  profile,
  place,
  isAdmin,
  user_id,
}: {
  profile: any;
  place: number;
  isAdmin: boolean;
  user_id: string;
}) {
  return (
    <Card
      className={`flex flex-col items-center p-4 ${
        place === 1 ? "bg-yellow-200" : place === 2 ? "bg-gray-200" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-center mr-4">
        <h2
          className={`${
            place === 1 ? "text-4xl" : place === 2 ? "text-3xl" : "text-2xl"
          } font-bold text-primaryflex items-center justify-center`}
        >
          {place === 1 ? "🥇" : place === 2 ? "🥈" : place === 3 ? "🥉" : place}
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center mr-4">
        <p
          className={`${
            place === 1 ? "text-xl" : place === 2 ? "text-lg" : "text-md"
          } font-bold text-primary`}
        >
          {profile.first_name} {profile.last_name}
        </p>
        <p
          className={`${
            place === 1 ? "text-md" : place === 2 ? "text-sm" : "text-sm"
          } text-primary`}
        >
          {isAdmin || profile.user_id === user_id
            ? profile.hunches_count
            : "???"}{" "}
          hunches
        </p>
      </div>
    </Card>
  );
}
