import Header from "@/components/ui/header";
import BookingItem from "@/components/ui/booking-item";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";

const Bookings = async () => {
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
  });

  return (
    <>
      <Header />

      <div className="p-5">
        <h1 className="text-xl font-bold mb-4">Agendamentos</h1>

        {bookings.length === 0 && <p>Você ainda não possui agendamentos.</p>}

        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
};

export default Bookings;
