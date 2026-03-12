import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";
import { Prisma } from "@prisma/client";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>

      <Card>
        <CardContent className="flex justify-between p-1">
          {/* ESQUERDA */}
          <div className="flex flex-col gap-2 py-5">
            <Badge className="w-fit">Confirmado</Badge>

            <h3 className="font-semibold">{booking.service.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={booking.service.barbershop.imageUrl} />
                <AvatarFallback>PB</AvatarFallback>
              </Avatar>

              <p className="text-sm">{booking.service.barbershop.name}</p>
            </div>
          </div>

          {/* DIREITA */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm">
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
    </>
  );
};

export default BookingItem;
