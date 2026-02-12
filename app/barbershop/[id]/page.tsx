import { db } from "@/app/_lib/prisma";
import PhoneItem from "@/components/phone-item";
import ServiceItem from "@/components/service-item";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BarbershopPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const barbershop = await db.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

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

      {/*Título*/}
      <div className="p-5 border-b border-solid">
        <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>
        <div className="flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      {/*Descrição*/}
      <div className="p-5 border-b border-solid space-y-2">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-sm text-justify">{barbershop?.description}</p>
      </div>
      {/*Serviços*/}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold uppercase text-gray-400">Serviços</h2>
        <div className="space-y-3">
          {barbershop?.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      {/* Contato */}
      <div className="p-5 space-y-3">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
