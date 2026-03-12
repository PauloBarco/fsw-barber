import Header from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "@/components/ui/barbershop-item";
import { quickSearchOptions } from "./_constants/search";
import BookingItem from "@/components/ui/booking-item";
import HomeHeader from "@/components/ui/home-header";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

interface HomeProps {
  searchParams?: {
    search?: string;
  };
}

export const runtime = "nodejs";

const Home = async ({ searchParams }: HomeProps) => {
  const session = await getServerSession(authOptions);
  const search = searchParams?.search;

  // BUSCA BARBEARIAS
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

  // BARBEARIAS POPULARES
  const popularbarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  // AGENDAMENTOS DO USUÁRIO
  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: session.user.id as string,
        },
        orderBy: {
          date: "asc",
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
      })
    : [];

  // PRÓXIMO AGENDAMENTO
  const nextBooking = bookings[0];

  return (
    <div>
      {/* HEADER */}
      <Header />

      <div className="p-5">
        <HomeHeader />

        {/* BUSCA */}
        <form className="relative mt-6" action="/">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Buscar barbearias..."
            className="w-full rounded-xl bg-zinc-900 py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-primary"
          />
        </form>

        {/* BUSCA RÁPIDA */}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild>
              <Link href={`/barbershops?search=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* BANNER */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        {/* PRÓXIMO AGENDAMENTO */}
        {nextBooking && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Seu próximo agendamento
            </h2>

            <BookingItem booking={nextBooking} />
          </>
        )}

        {/* RECOMENDADOS */}
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>

        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        {/* POPULARES */}
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
