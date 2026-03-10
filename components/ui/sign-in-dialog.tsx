"use client";

import { signIn } from "next-auth/react";
import { Button } from "./button";
import { DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import Image from "next/image";

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn("google");

  return (
    <>
      <DialogHeader>
        <DialogTitle>Faça login na plataforma</DialogTitle>

        <DialogDescription>
          Conecte-se usando sua conta do Google para acessar todos os recursos
          disponíveis.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant="outline"
        className="gap-1 font-bold"
        onClick={handleLoginWithGoogleClick}>
        <Image
          src="/google.svg"
          alt="Fazer login com Google"
          width={18}
          height={18}
        />
        Continuar com Google
      </Button>
    </>
  );
};

export default SignInDialog;
