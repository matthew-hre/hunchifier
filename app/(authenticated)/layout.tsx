import { redirect } from "next/navigation";
import { getUserId } from "@/lib/supabase/utils";

import Header from "@/components/header/Header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userId = await getUserId();

  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header />
      <main className="w-full max-w-2xl p-2 space-y-2 border-top border-secondary mt-14">
        {children}
      </main>
    </div>
  );
}
