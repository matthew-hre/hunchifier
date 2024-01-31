import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

export default async function Header() {
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

  return (
    <header className="fixed z-10 bg-background flex items-center justify-between w-full max-w-2xl px-4 py-2 border-b border-secondary">
      <Link href="/">
        <h1 className="text-2xl font-bold">Hunchifier</h1>
      </Link>
      <div className="flex flex-row items-center space-x-2">
        <Link href="/leaderboard">
          <Button className="text-sm text-primary" variant="link">
            Leaderboard
          </Button>
        </Link>
        <form action={logout} className="border-l border-secondary pl-2">
          <Button type="submit" className="text-sm text-primary" variant="link">
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
}
