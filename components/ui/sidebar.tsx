"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CalendarIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) =>
    pathname === path
      ? "bg-accent text-primary font-semibold"
      : "text-muted-foreground";

  return (
    <aside className="w-64 h-screen border-r p-5 flex flex-col justify-between">
      <div className="flex flex-col gap-6">
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
      </div>

      {/* USER */}
      {session?.user && (
        <div className="flex flex-col gap-3 border-t pt-4">
          <p className="text-sm">{session.user.name}</p>

          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 text-red-500">
            <LogOutIcon size={16} />
            Sair
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
