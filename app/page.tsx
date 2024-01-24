import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Hunch from "@/components/Hunch";

import Link from "next/link";

import { FiPlus } from "react-icons/fi";
import { Card } from "@/components/ui/card";
import HunchCounter from "@/components/HunchCounter";

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

  const logout = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    return redirect("/signup");
  };

  const hunches = await getHunches();

  return (
    <div className="flex flex-col items-center min-h-screen">
      <header className="fixed z-10 bg-background flex items-center justify-between w-full max-w-2xl px-4 py-2 border-b border-secondary">
        <Link href="/">
          <h1 className="text-2xl font-bold">Hunchifier</h1>
        </Link>
        <form action={logout}>
          <button type="submit" className="text-sm text-primary">
            Logout
          </button>
        </form>
      </header>
      <div className="w-full max-w-2xl py-2 space-y-2 border-top border-secondary mt-12">
        <HunchCounter />
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
