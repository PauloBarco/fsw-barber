"use server";

import { endOfDay, startOfDay } from "date-fns";
import { db } from "../_lib/prisma";

interface GetBookingsProps {
  serviceId: string;
  date: Date;
}

export const getBookings = async ({ serviceId, date }: GetBookingsProps) => {
  const bookings = await db.booking.findMany({
    where: {
      serviceId,
      date: {
        gte: startOfDay(date),
        lte: endOfDay(date),
      },
    },
  });

  return bookings;
};
