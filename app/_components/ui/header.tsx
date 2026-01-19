import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const Header = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-center py-4">
        <Image
          alt="FSW Barber"
          src="/logo.png"
          height={18}
          width={120}
          priority
        />
      </CardContent>
    </Card>
  );
};

export default Header;
