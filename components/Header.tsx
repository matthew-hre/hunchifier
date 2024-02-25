import { createClient } from "@/lib/supabase/server";
import { getUserId } from "@/lib/supabase/utils";
import { redirect } from "next/navigation";

import HeaderClient from "./HeaderClient";

export default async function Header() {
  const userId = await getUserId();

  const logout = async () => {
    "use server";

    console.log("logging out");

    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    return redirect("/login");
  };

  const getPermissions = async () => {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("user_permissions")
      .select("admin, tinder")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    return data;
  };

  const permissions = await getPermissions();

  // Define navigation items
  const navItems = [
    { href: "/app", icon: "IoHome", label: "Home", hideOnMobile: true },
    { href: "/analytics", icon: "IoStatsChart", label: "Analytics" },
    {
      href: "/leaderboard",
      icon: "IoTrophy",
      label: "Leaderboard",
    },
    {
      icon: "IoLogOut",
      label: "Logout",
      logoutAction: logout,
    },
  ];

  if (permissions?.admin) {
    navItems.unshift({ href: "/admin", icon: "IoShield", label: "Admin" });
  }

  if (permissions?.tinder) {
    navItems.unshift({ href: "/tinder", icon: "IoFlame", label: "Tinder" });
  }

  return <HeaderClient navItems={navItems} logoutAction={logout} />;
}
