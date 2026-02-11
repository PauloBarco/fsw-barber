import { db } from "@/app/_lib/prisma";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BarbershopPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const barbershop = await db.barbershop.findUnique({
    where: { id },
  });

  return (
    <div>
      {/* Imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop?.imageUrl ?? "/placeholder.png"}
          alt={barbershop?.name ?? "Barbershop"}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild>
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4">
          <MenuIcon />
        </Button>
      </div>

      <div className="p-5 border-b border-solid">
        <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>
        <div className="flex items-center gap-1">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-1">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;
