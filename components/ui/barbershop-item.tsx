import { Barbershop } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "./card";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card>
      <CardContent>
        <div className="relative h-[159px] w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
