import { redirect } from "next/navigation";
import { getUserId } from "@/lib/supabase/utils";
import Head from "next/head";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserId();

  if (userId) {
    redirect("/app");
  }

  return (
    <>
      <Head>
        <title>Hunchifier</title>
        <meta name="description" content="Born out of a hatred of Miro" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      {children}
    </>
  );
}
