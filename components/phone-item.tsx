"use client";

import { SmartphoneIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface PhoneItemProps {
  phone: string;
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyPhoneClick = async () => {
    await navigator.clipboard.writeText(phone);
    toast.success("Número copiado para a área de transferência!");
  };

  return (
    <div className="flex justify-between">
      {/* Esquerda */}
      <div className="flex items-center gap-2">
        <SmartphoneIcon size={18} />
        <p className="text-sm">{phone}</p>
      </div>

      {/* Direita */}
      <Button variant="outline" size="sm" onClick={handleCopyPhoneClick}>
        Copiar
      </Button>
    </div>
  );
};

export default PhoneItem;
