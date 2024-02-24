import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

// react icons
import { IoLogOut, IoTrophy, IoHome, IoStatsChart } from "react-icons/io5";

export default async function Header() {
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

  // Define navigation items
  const navItems = [
    { href: "/app", icon: IoHome, label: "Home" },
    { href: "/analytics", icon: IoStatsChart, label: "Analytics" },
    {
      href: "/leaderboard",
      icon: IoTrophy,
      label: "Leaderboard",
    },
    {
      icon: IoLogOut,
      label: "Logout",
      logoutAction: logout,
    }, // Assuming logoutFunction is defined elsewhere
  ];

  return (
    <header className="fixed z-10 bg-background flex items-center justify-between w-full px-4 py-2 border-b border-secondary">
      <Link href="/app">
        <h1 className="text-2xl font-bold hidden sm:block ">Hunchifier</h1>
        <IoHome size={24} className="sm:hidden" />
      </Link>
      <div className="flex flex-row items-center space-x-4">
        {navItems.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </div>
    </header>
  );
}

// Define a reusable component for navigation items
const NavItem = ({
  href,
  icon: Icon,
  label,
  logoutAction,
}: {
  href?: any;
  icon: any;
  label: any;
  logoutAction?: any;
}) => (
  <>
    {href ? (
      <Link
        href={href || "#"}
        className={`flex flex-row items-center space-x-2`}
      >
        <Button className="text-sm text-primary hidden sm:block" variant="link">
          {label}
        </Button>
        <Icon size={24} className="sm:hidden" />
      </Link>
    ) : (
      <form action={logoutAction} className="flex items-center space-x-2">
        <Button
          type="submit"
          className="text-sm text-primary hidden sm:block"
          variant="link"
        >
          <p>{label}</p>
        </Button>
        <Button type="submit" className="sm:hidden" variant="link">
          <Icon size={24} />
        </Button>
      </form>
    )}
  </>
);
