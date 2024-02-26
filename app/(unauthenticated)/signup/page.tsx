import { createClient } from "@/lib/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import SignUpFormClient from "./SignUpFormClient";

export default async function Index({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signInWithGithub = async () => {
    "use server";

    const origin = headers().get("origin") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      return;
    }

    return redirect(data.url as string);
  };

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.error(error);
      return redirect("/login?message=Invalid%20credentials");
    }

    return redirect(
      "/login?message=Check%20your%20email%20for%20a%20login%20link"
    );
  };

  return (
    <>
      <SignUpFormClient
        searchParams={searchParams}
        signInWithGithub={signInWithGithub}
        signUp={signUp}
      />
    </>
  );
}
