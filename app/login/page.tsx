import { createClient } from "@/lib/supabase/server";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

import LoginFormClient from "./LoginFormClient";
import SEO from "@/components/SEO";

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { user } = (await supabase.auth.getUser())?.data;

  if (user) {
    redirect("/");
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Invalid%20credentials");
    }

    return redirect("/");
  };

  const signInWithGithub = async () => {
    "use server";

    const origin = headers().get("origin") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

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
      <SEO pageTitle="Hunchifier" pageDescription="Login" />
      <LoginFormClient
        searchParams={searchParams}
        signIn={signIn}
        signInWithGithub={signInWithGithub}
      />
    </>
  );
}
