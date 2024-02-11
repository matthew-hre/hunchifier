import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

// react icons
import { IoLogOut, IoTrophy, IoHome } from "react-icons/io5";

export default async function Header() {
  const logout = async () => {
    "use server";

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    return redirect("/signup");
  };
  return (
    <header className="fixed z-10 bg-background flex items-center justify-between w-full px-4 py-2 border-b border-secondary">
      <Link href="/">
        <h1 className="text-2xl font-bold hidden sm:block ">Hunchifier</h1>
        <IoHome className="text-2xl sm:hidden" />
      </Link>
      <div className="flex flex-row items-center space-x-2">
        <Link href="/leaderboard">
          <Button
            className="text-sm text-primary hidden sm:block
          "
            variant="link"
          >
            Leaderboard
          </Button>
          <IoTrophy className="text-xl sm:hidden mr-4" />
        </Link>
        <form action={logout} className="border-l border-secondary pl-2">
          <Button
            type="submit"
            className="text-sm text-primary hidden sm:block
          "
            variant="link"
          >
            <p>Logout</p>
          </Button>
          <Button type="submit" className="sm:hidden" variant="link">
            <IoLogOut size={24} />
          </Button>
        </form>
      </div>
    </header>
  );
}
