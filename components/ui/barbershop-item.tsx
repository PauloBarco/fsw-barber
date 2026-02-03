import { Barbershop } from "@prisma/client";
import { CardContent } from "./card";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <card>
      <CardContent>
        <div className="relative h-[159px]">
          <Image fil className="object-cover" src={barbershop.imageUrl}/>
        </div>
      </CardContent>
    </card>
};

export default BarbershopItem;