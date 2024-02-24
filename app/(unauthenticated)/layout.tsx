import { redirect } from "next/navigation";
import { getUserId } from "@/lib/supabase/utils";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserId();

  if (userId) {
    redirect("/app");
  }

  return <>{children}</>;
}
