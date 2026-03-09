"use client";

import { getBookings } from "@/app/_actions/get-bookings";
import { createBooking } from "@/app/_actions/create-booking";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";

import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { format, set } from "date-fns";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Booking {
  id: string;
  date: Date;
}

interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  barbershopId: string;
}

interface ServiceItemProps {
  service: Service;
  barbershop: {
    name: string;
  };
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data: session } = useSession();

  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  // 🔹 Carrega agendamentos do dia
  useEffect(() => {
    const fetchBookings = async () => {
      if (!selectedDay) return;

      const bookings = await getBookings({
        serviceId: service.id,
        date: selectedDay,
      });

      setDayBookings(bookings);
    };

    fetchBookings();
  }, [selectedDay, service.id]);

  const handleDateSelected = (date: Date | undefined) => {
    setSelectedDay(date);
    setSelectedTime(undefined);
  };

  const handleTimeSelected = (time: string) => {
    setSelectedTime(time);
  };

  // 🔹 Criar agendamento
  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return;

      if (!session?.user) {
        toast.error("Você precisa estar logado para reservar.");
        return;
      }

      const [hour, minute] = selectedTime.split(":").map(Number);

      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
      });

      await createBooking({
        serviceId: service.id,
        userId: session.user.id,
        date: newDate,
      });

      toast.success("Reserva criada com sucesso!");

      // 🔹 Atualiza horários ocupados
      const bookings = await getBookings({
        serviceId: service.id,
        date: selectedDay,
      });

      setDayBookings(bookings);

      // 🔹 limpa horário selecionado
      setSelectedTime(undefined);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar reserva.");
    }
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* IMAGEM */}
        <div className="relative h-[110px] w-[110px]">
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        {/* DIREITA */}
        <div className="space-y-2 w-full">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-500">{service.description}</p>

          {/* PREÇO + BOTÃO */}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(service.price)}
            </p>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>

              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                {/* CALENDÁRIO */}
                <div className="py-5 border-b">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelected}
                    disabled={{ before: new Date() }}
                    className="w-full"
                  />
                </div>

                {/* HORÁRIOS */}
                {selectedDay && (
                  <div className="border-b p-5 flex overflow-auto gap-3 [&::-webkit-scrollbar]:hidden">
                    {TIME_LIST.map((time) => {
                      const isBooked = dayBookings.some(
                        (booking) => format(booking.date, "HH:mm") === time,
                      );

                      return (
                        <Button
                          key={time}
                          variant={
                            selectedTime === time ? "default" : "outline"
                          }
                          size="sm"
                          className="rounded-full"
                          disabled={isBooked}
                          onClick={() => handleTimeSelected(time)}>
                          {time}
                        </Button>
                      );
                    })}
                  </div>
                )}

                {/* RESUMO */}
                {selectedDay && selectedTime && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="p-3 space-y-3">
                        <div className="flex justify-between">
                          <h2 className="font-bold">{service.name}</h2>

                          <p className="font-bold text-sm">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(service.price)}
                          </p>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Data</span>

                          <span className="text-sm">
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">Horário</span>
                          <span className="text-sm">{selectedTime}</span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-gray-400 text-sm">
                            Barbearia
                          </span>

                          <span className="text-sm">{barbershop.name}</span>
                        </div>

                        <SheetFooter className="mt-5">
                          <SheetClose asChild>
                            <Button
                              onClick={handleCreateBooking}
                              disabled={!selectedDay || !selectedTime}>
                              Confirmar Agendamento
                            </Button>
                          </SheetClose>
                        </SheetFooter>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
