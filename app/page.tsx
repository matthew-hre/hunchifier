import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Hunch from "@/components/Hunch";

import Link from "next/link";

import { FiPlus } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import HunchCounter from "@/components/HunchCounter";
import Header from "@/components/Header";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { user } = (await supabase.auth.getUser())?.data;

  if (user === null) {
    redirect("/login");
  }

  const getHunches = async () => {
    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    const { data, error } = await supabase
      .from("hunches")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const hunches = await getHunches();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <div className="w-full max-w-2xl py-2 space-y-2 border-top border-secondary mt-14">
        <Card className="flex flex-col items-center justify-center p-4 pt-2">
          <HunchCounter />
        </Card>
        <Card>
          <Link href="/newhunch">
            <button
              type="submit"
              className="w-full flex flex-row items-center justify-center p-4 hover:bg-secondary transition-colors duration-200"
            >
              <FiPlus size={20} />
              <span
                className="ml-2
              text-md font-semibold text-primary
              "
              >
                New Hunch
              </span>
            </button>
          </Link>
        </Card>
        {hunches?.map((hunch) => (
          <Hunch key={hunch.id} hunch={hunch} />
        ))}
      </div>
    </div>
  );
}
