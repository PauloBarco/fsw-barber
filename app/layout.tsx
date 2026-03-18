import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/components/footer";
import AuthProvider from "./_providers/auth";

// 🔥 NOVOS
import Header from "@/components/ui/header";
import Sidebar from "@/components/ui/sidebar";
import BottomNav from "@/components/ui/bottom-nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FSW Barber",
  description: "Sistema de agendamento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <div className="flex min-h-screen">
            {/* 🖥️ SIDEBAR (DESKTOP) */}
            <div className="hidden md:flex">
              <Sidebar />
            </div>

            {/* 📱 CONTEÚDO */}
            <div className="flex flex-1 flex-col">
              {/* HEADER GLOBAL */}
              <Header />

              {/* PÁGINAS */}
              <main className="flex-1 p-5 pb-20 md:pb-5">{children}</main>

              {/* FOOTER */}
              <Footer />

              {/* MOBILE NAV */}
              <div className="md:hidden">
                <BottomNav />
              </div>
            </div>
          </div>
        </AuthProvider>

        <Toaster />
      </body>
    </html>
  );
}
