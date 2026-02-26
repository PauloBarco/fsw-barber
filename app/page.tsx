import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "@/components/ui/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "@/components/ui/booking-item";

interface HomeProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export const runtime = "nodejs";

const Home = async ({ searchParams }: HomeProps) => {
  const params = await searchParams;
  const search = params?.search;

  const barbershops = await db.barbershop.findMany({
    where: search
      ? {
          name: {
            contains: search,
            mode: "insensitive",
          },
        }
      : {},
  });

  const popularbarbershops = await db.barbershop.findMany({
    orderBy: { name: "desc" },
  });

  console.log({ barbershops });
  return (
    <div>
      {/* header */}
      <Header />
      {/* Texto */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Paulo</h2>
        <p>Segunda-feira, 19 de janeiro.</p>

        {/* Busca */}
        <form className="relative mt-6" action="/">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="search"
            defaultValue={params?.search}
            placeholder="Buscar barbearias..."
            className="w-full rounded-xl bg-zinc-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary"
          />
        </form>

        {/* Busaca Rapida*/}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        {/* Imagem */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* Agendamento */}
        <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularbarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
