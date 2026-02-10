import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";

// TODO: receber agenda por props
const BookingItem = () => {
  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>

      <Card>
        <CardContent className="flex justify-between p-1">
          {/* Esquerda */}
          <div className="flex flex-col gap-2 py-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                <AvatarFallback>PB</AvatarFallback>
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>

          {/* Direita */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm">Janeiro</p>
            <p className="text-2xl">23</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingItem;
