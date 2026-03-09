"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";

const SidebarSheet = () => {
  const { data: session } = useSession();

  const handleLoginWithGoogleClick = () => signIn("google");
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3">
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "Usuário"}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}

        <div>
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
              <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                  Conecte-se usuando sua conta do Google para acessar todos os
                  recursos disponíveis.
                </DialogDescription>
              </DialogHeader>

              <Button
                variant="outline"
                className="gap-1 font-bold"
                onClick={handleLoginWithGoogleClick}>
                <Image
                  src="/google.svg"
                  alt="Fazer login com o Google"
                  width={18}
                  height={18}
                />
                Continuar com Google
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Menu principal */}
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" variant="ghost" asChild>
            <Link href="/">
              <HomeIcon size={18} />
              Início
            </Link>
          </Button>
        </SheetClose>
        <Button className="justify-start gap-2" variant="ghost" asChild>
          <Link href="/bookings">
            <CalendarIcon size={18} />
            Agendamentos
          </Link>
        </Button>
      </div>

      {/* Busca rápida */}
      <div className="flex flex-col gap-2 py-5 border-b border-solid">
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

      <div className="flex flex-col gap-2 py-5">
        {session?.user && (
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={() => signOut()}>
            <LogOutIcon size={18} />
            Sair da Conta
          </Button>
        )}
      </div>
    </SheetContent>
  );
};

export default SidebarSheet;
