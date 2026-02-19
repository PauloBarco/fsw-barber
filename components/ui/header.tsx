import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

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

          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="py-5 border-b flex items-center border-solid gap-3">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" />
              </Avatar>

              <div>
                <p className="font-bold">Paulo Barco</p>
                <p className="text-xs">paulo.barco34@gmail.com</p>
              </div>
            </div>

            {/* Menu principal */}
            <div className="flex flex-col gap-2 py-5 border-b border-solid">
              <SheetClose asChild>
                <Button variant="ghost" className="justify-start gap-2">
                  <HomeIcon size={18} />
                  Início
                </Button>
              </SheetClose>

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

            <div className="flex flex-col gap-2 py-5">
              <Button variant="ghost" className="justify-start gap-2">
                <LogOutIcon size={18} />
                Sai da Conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
