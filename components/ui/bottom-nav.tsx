"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarIcon } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "bg-accent font-bold" : "";

  return (
    <div className="w-64 h-screen border-r p-5 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Barber</h1>

      <Link
        href="/"
        className={`flex items-center gap-2 p-2 rounded ${isActive("/")}`}
      >
        <HomeIcon size={18} />
        Home
      </Link>

      <Link
        href="/bookings"
        className={`flex items-center gap-2 p-2 rounded ${isActive("/bookings")}`}
      >
        <CalendarIcon size={18} />
        Agendamentos
      </Link>
    </div>
  );
};

export default Sidebar;