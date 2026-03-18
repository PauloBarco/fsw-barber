import Header from "@/components/ui/header";
import BookingItem from "@/components/ui/booking-item";
import { db } from "./_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import { Prisma } from "@prisma/client";

// TIPAGEM
type BookingWithRelations = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        barbershop: true;
      };
    };
  };
}>;

// SERIALIZA
const serializeBooking = (booking: BookingWithRelations) => ({
  ...booking,
  service: {
    ...booking.service,
    price: Number(booking.service.price),
  },
});

const Home = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return notFound();
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
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

  const serializedBookings = bookings.map(serializeBooking);

  const nextBooking = serializedBookings.find(
    (booking) => new Date(booking.date) > new Date(),
  );

  return (
    <>
      <Header />

      <div className="p-5">
        {nextBooking && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Seu próximo agendamento
            </h2>

            <BookingItem booking={nextBooking} />
          </>
        )}

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Todos os agendamentos
        </h2>

        <div className="flex flex-col gap-3">
          {serializedBookings.map((booking) => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
