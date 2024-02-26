import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import LoginFormClient from "./LoginFormClient";
export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Invalid%20credentials");
    }

    return redirect("/app");
  };

  const signInWithGithub = async () => {
    "use server";

    const origin = headers().get("origin") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback/`,
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    return redirect(data.url as string);
  };

  return (
    <>
      <LoginFormClient
        searchParams={searchParams}
        signIn={signIn}
        signInWithGithub={signInWithGithub}
      />
    </>
  );
}
