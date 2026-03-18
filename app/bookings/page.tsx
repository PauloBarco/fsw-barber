import Header from "@/components/ui/header";
import BookingItem from "@/components/ui/booking-item";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

// 🔥 TIPAGEM DO PRISMA (COM RELAÇÕES)
type BookingWithRelations = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barbershop: true;
      };
    };
  };
}>;

// 🔥 DTO (O QUE O FRONT VAI RECEBER)
type BookingFormatted = {
  id: string;
  date: Date;
  service: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number; // ✅ AGORA É NUMBER
    barbershopId: string;
    barbershop: {
      id: string;
      name: string;
      imageUrl: string;
      address: string;
      description: string;
      phones: string[];
      createdAt: Date;
      updatedAt: Date;
    };
  };
};

// 🔥 FUNÇÃO QUE REMOVE O DECIMAL
const formatBooking = (booking: BookingWithRelations): BookingFormatted => ({
  ...booking,
  service: {
    ...booking.service,
    price: Number(booking.service.price), // 💥 AQUI RESOLVE
    barbershop: booking.service.barbershop,
  },
});

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return notFound();
  }

  // 🔥 BUSCAS
  const confirmedBookingsRaw = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  const concludedBookingsRaw = await db.booking.findMany({
    where: {
      userId: session.user.id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  // 🔥 CONVERSÃO FINAL (REMOVE DECIMAL)
  const confirmedBookings: BookingFormatted[] =
    confirmedBookingsRaw.map(formatBooking);

  const concludedBookings: BookingFormatted[] =
    concludedBookingsRaw.map(formatBooking);

  return (
    <>
      <Header />

      <div className="space-y-6 p-5">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p>Você ainda não possui agendamentos.</p>
        )}

        {/* FUTUROS */}
        {confirmedBookings.length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-gray-400 uppercase">
              Confirmados
            </h2>

            {confirmedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}

        {/* PASSADOS */}
        {concludedBookings.length > 0 && (
          <>
            <h2 className="text-sm font-semibold text-gray-400 uppercase">
              Finalizados
            </h2>

            {concludedBookings.map((booking) => (
              <BookingItem key={booking.id} booking={booking} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;
