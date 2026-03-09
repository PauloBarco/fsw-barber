"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const { data: session } = useSession();

  if (!session?.user) {
    return <div className="p-10">Faça login para acessar seu perfil.</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 flex flex-col items-center gap-5">
      <Avatar className="w-24 h-24">
        <AvatarImage src={session.user.image ?? ""} />
        <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
      </Avatar>

      <h1 className="text-xl font-bold">{session.user.name}</h1>

      <p className="text-muted-foreground">{session.user.email}</p>
    </div>
  );
}
