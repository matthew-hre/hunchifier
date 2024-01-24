import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import HunchFormClient from "./HunchFormClient";
import Link from "next/link";

export default function newHunch() {
  const createHunch = async (formData: FormData) => {
    "use server";

    const possible_problem = formData.get("problem") as string;
    const possible_solution = formData.get("solution") as string;
    const possible_client = formData.get("users") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const user_id = await supabase.auth
      .getUser()
      .then((user) => user.data?.user?.id);

    const { error } = await supabase.from("hunches").insert([
      {
        possible_problem,
        possible_solution,
        possible_client,
        user_id,
      },
    ]);

    if (error) {
      console.log(error);
      return redirect("/newhunch?message=Invalid%20credentials");
    }

    return redirect("/login");
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
      <div className="w-full max-w-2xl pt-4 py-2 space-y-2 border-top border-secondary mt-12 h-auto">
        <HunchFormClient createHunch={createHunch} />
      </div>
    </div>
  );
}
