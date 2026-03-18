"use client";

import { isFuture } from "date-fns";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

// ✅ DTO (SEM PRISMA)
interface BookingItemProps {
  booking: {
    id: string;
    date: Date;
    service: {
      id: string;
      name: string;
      description: string;
      imageUrl: string;
      price: number;
      barbershopId: string;
      barbershop: {
        id: string;
        name: string;
        imageUrl: string;
        address: string;
        description: string;
        phones: string[];
        createdAt: Date;
        updatedAt: Date;
      };
    };
  };
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const router = useRouter();

  // 🛡️ proteção extra
  if (!booking) return null;

  const {
    service: { barbershop },
  } = booking;

  const isConfirmed = isFuture(new Date(booking.date));

  const handleCancel = async () => {
    try {
      await fetch(`/api/bookings/${booking.id}`, {
        method: "DELETE",
      });

      // 🔥 atualização elegante (sem reload)
      router.refresh();
    } catch (error) {
      console.error("Erro ao cancelar agendamento:", error);
    }
  };

  return (
    <Sheet>
      {/* CARD */}
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-1">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}>
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={barbershop.imageUrl} />
                  <AvatarFallback>
                    {barbershop.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <p className="text-sm">{barbershop.name}</p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm capitalize">
                {new Date(booking.date).toLocaleString("pt-BR", {
                  month: "long",
                })}
              </p>

              <p className="text-2xl">{new Date(booking.date).getDate()}</p>

              <p className="text-sm">
                {new Date(booking.date).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      {/* MODAL */}
      <SheetContent className="w-[90%] p-0">
        {/* HEADER */}
        <div className="relative h-[180px] w-full">
          <Image
            alt={`Mapa da barbearia ${barbershop.name}`}
            src="/maps.png"
            fill
            className="object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={barbershop.imageUrl} />
              <AvatarFallback>
                {barbershop.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="text-white">
              <p className="font-semibold">{barbershop.name}</p>
              <p className="text-xs opacity-80">{barbershop.address}</p>
            </div>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="p-5 space-y-4">
          <SheetHeader>
            <SheetTitle className="text-left">
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>

          {/* SERVIÇO */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-sm text-gray-400">Serviço</p>
              <p className="font-semibold">{booking.service.name}</p>
            </CardContent>
          </Card>

          {/* DATA */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-sm text-gray-400">Data</p>
              <p className="font-semibold">
                {new Date(booking.date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </CardContent>
          </Card>

          {/* HORÁRIO */}
          <Card>
            <CardContent className="p-4 space-y-2">
              <p className="text-sm text-gray-400">Horário</p>
              <p className="font-semibold">
                {new Date(booking.date).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </CardContent>
          </Card>

          {/* BOTÃO */}
          <button
            onClick={handleCancel}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition">
            Cancelar agendamento
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingItem;
