"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

import {
  IoLogOut,
  IoTrophy,
  IoHome,
  IoStatsChart,
  IoFlame,
  IoShield,
  IoSunny,
  IoMoon,
} from "react-icons/io5";

// import { useTheme } from "next-themes";

export default function HeaderClient({ navItems }: { navItems: any }) {
  //   const { theme, setTheme } = useTheme();

  //   const toggleTheme = () => {
  //     console.log("toggling theme");
  //     if (theme === "light") {
  //       setTheme("dark");
  //     }
  //     if (theme === "dark") {
  //       setTheme("light");
  //     }
  //   };

  // such a hack
  const navItemsWithTheme = [
    ...navItems,
    // {
    //   icon: theme === "light" ? "IoMoon" : "IoSunny",
    //   label: theme === "light" ? <IoMoon size={24} /> : <IoSunny size={24} />,
    //   logoutAction: toggleTheme,
    // },
  ];

  return (
    <header className="fixed z-10 bg-background flex items-center justify-between w-full px-6 md:px-4 py-4 md:py-2 border-b border-secondary">
      <Link href="/app">
        <h1 className="text-2xl font-bold hidden md:block ">Hunchifier</h1>
        <IoHome size={24} className="md:hidden" />
      </Link>

      <div className="flex flex-row items-center">
        {navItemsWithTheme.map((item: any, index: any) => (
          <NavItem key={index} {...item} />
        ))}
      </div>
    </header>
  );
}

const NavItem = ({
  href,
  icon,
  label,
  logoutAction,
  hideOnMobile,
}: {
  href?: any;
  icon: any;
  label: any;
  logoutAction?: any;
  hideOnMobile?: boolean;
}) => {
  const icons: { [key: string]: any } = {
    IoHome: IoHome,
    IoStatsChart: IoStatsChart,
    IoTrophy: IoTrophy,
    IoLogOut: IoLogOut,
    IoFlame: IoFlame,
    IoShield: IoShield,
    IoSunny: IoSunny,
    IoMoon: IoMoon,
  };

  const IconComponent = icons[icon as string];

  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <>
      {href ? (
        <Link
          href={href || "#"}
          className="flex flex-row items-center space-x-6"
        >
          <Button
            className={`text-sm text-primary hidden md:block ${
              isActive ? "text-muted-foreground" : "text-primary"
            }`}
            variant="link"
          >
            {label}
          </Button>
          <IconComponent
            size={24}
            className={`md:hidden ${hideOnMobile ? "hidden" : "block"}
                ${isActive ? "text-muted-foreground" : "text-primary"}
            `}
          />
        </Link>
      ) : (
        <form
          action={logoutAction}
          className="flex flex-row items-center space-x-6 md:space-x-0"
        >
          <Button
            type="submit"
            className="text-sm text-primary hidden md:block"
            variant="link"
          >
            <p>{label}</p>
          </Button>
          <button type="submit" className="md:hidden">
            <IconComponent size={24} />
          </button>
        </form>
      )}
    </>
  );
};
