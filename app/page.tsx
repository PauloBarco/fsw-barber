import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";

const Home = () => {
  return (
    <div>
      {/* header */}
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Paulo</h2>
        <p>Segunda-feira, 19 de janeiro.</p>

        <div className="flex items-center gap-2">
          <Input placeholder="Faça sua Busca..." />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
