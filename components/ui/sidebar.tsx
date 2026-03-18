"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarIcon } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path
      ? "bg-accent text-primary font-semibold"
      : "text-muted-foreground";

  return (
    <aside className="w-64 h-screen border-r p-5 flex flex-col gap-6">
      <h1 className="text-xl font-bold">FSW Barber</h1>

      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/")}`}>
          <HomeIcon size={18} />
          Início
        </Link>

        <Link
          href="/bookings"
          className={`flex items-center gap-2 p-2 rounded-md ${isActive("/bookings")}`}>
          <CalendarIcon size={18} />
          Agendamentos
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
