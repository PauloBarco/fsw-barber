"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { quickSearchOptions } from "@/app/_constants/search";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { signOut, useSession } from "next-auth/react";
import SingInDialog from "./sign-in-dialog";

const SidebarSheet = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path ? "bg-accent font-semibold" : "";

  return (
    <SheetContent className="overflow-y-auto">
      {/* HEADER */}
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      {/* USER */}
      <div className="flex items-center gap-3 py-4">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "Usuário"}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}

        <div className="flex-1">
          <h2 className="font-bold">
            {session?.user
              ? `Olá, ${session.user.name}`
              : "Olá, faça seu login"}
          </h2>

          {session?.user?.email && (
            <p className="text-xs text-gray-400">{session.user.email}</p>
          )}
        </div>

        {!session?.user && (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon">
                <LogInIcon />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[90%]">
              <SingInDialog />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* MENU PRINCIPAL */}
      <div className="flex flex-col gap-2 border-b py-5">
        {/* HOME */}
        <SheetClose asChild>
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent ${isActive(
              "/",
            )}`}>
            <HomeIcon size={18} />
            Início
          </Link>
        </SheetClose>

        {/* BOOKINGS */}
        <SheetClose asChild>
          <Link
            href="/bookings"
            className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent ${isActive(
              "/bookings",
            )}`}>
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </SheetClose>
      </div>

      {/* BUSCA RÁPIDA */}
      <div className="flex flex-col gap-2 py-5 border-b">
        {quickSearchOptions.map((option) => (
          <SheetClose key={option.title} asChild>
            <Link
              href={`/barbershops?search=${encodeURIComponent(option.title)}`}
              className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent">
              <Image
                src={option.imageUrl}
                alt={option.title}
                width={18}
                height={18}
              />
              {option.title}
            </Link>
          </SheetClose>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="flex flex-col gap-2 py-5">
        {session?.user && (
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="justify-start gap-2"
              onClick={() => signOut()}>
              <LogOutIcon size={18} />
              Sair da Conta
            </Button>
          </SheetClose>
        )}
      </div>
    </SheetContent>
  );
};

export default SidebarSheet;
