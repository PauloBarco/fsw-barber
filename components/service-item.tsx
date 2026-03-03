"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

interface Service {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number; // ✅ agora é number
  barbershopId: string; // ✅ incluído para evitar erro
}

interface ServiceItemProps {
  service: Service;
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

const ServiceItem = ({ service }: ServiceItemProps) => {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );

  const handleDateSelected = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelected = (time: string) => {
    setSelectedTime(time);
  };

  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-3">
        {/* Image */}
        <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px]">
          <Image
            alt={service.name}
            src={service.imageUrl}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        {/* Direita */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-500">{service.description}</p>
          {/* Preço e Botão*/}
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-primary">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}
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
                <div className="py-5 border-b border-solid w-full">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelected}
                    className="w-full"
                    styles={{
                      months: {
                        width: "100%",
                      },
                      table: {
                        width: "100%",
                      },
                      head_row: {
                        width: "100%",
                      },
                      row: {
                        width: "100%",
                      },
                      head_cell: {
                        textTransform: "capitalize",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />
                </div>
                {selectedDay && (
                  <div className="p-5 flex overflow-auto gap-3 [&::-webkit-scrollbar]:hidden ">
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        className="rounded-full"
                        onClick={() => handleTimeSelected(time)}>
                        {time}
                      </Button>
                    ))}
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
