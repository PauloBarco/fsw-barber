"use client";

import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const HomeHeader = () => {
  const { data: session } = useSession();

  const today = format(new Date(), "EEEE, d 'de' MMMM", {
    locale: ptBR,
  });

  return (
    <div>
      <h2 className="text-xl font-bold">
        Olá, {session?.user?.name ?? "Visitante"}
      </h2>

      <p className="capitalize text-sm text-gray-400">{today}</p>
    </div>
  );
};

export default HomeHeader;
