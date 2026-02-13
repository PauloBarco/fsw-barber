import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, HomeIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image alt="FSW Barber" src="/header.png" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            {/* Menu principal */}
            <div className="flex flex-col gap-2 py-5 border-b border-solid">
              <Button variant="ghost" className="justify-start gap-2">
                <HomeIcon size={18} />
                Início
              </Button>

              <Button variant="ghost" className="justify-start gap-2">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            {/* Busca rápida */}
            <div className="flex flex-col gap-2 py-5 border-b border-solid">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  variant="ghost"
                  className="justify-start gap-2">
                  <Image
                    src={option.imageUrl}
                    alt={option.title}
                    height={18}
                    width={18}
                  />
                  {option.title}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
