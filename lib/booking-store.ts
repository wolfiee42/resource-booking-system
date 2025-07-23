import { TBooking } from "@/types/booking";

// In-memory storage - replace with database in production
let bookings: TBooking[] = [
  {
    id: "1",
    resource: "DSLR Camera Kit",
    startTime: new Date("2025-07-23T14:00:00").toISOString(),
    endTime: new Date("2025-07-23T15:00:00").toISOString(),
    requestedBy: "Jhankar Mahbub",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    resource: "Meeting Pod",
    startTime: new Date("2025-07-24T10:00:00").toISOString(),
    endTime: new Date("2025-07-24T11:00:00").toISOString(),
    requestedBy: "HM Nayem",
    createdAt: new Date().toISOString(),
  },
];

export const bookingStore = {
  getAll: (): TBooking[] => [...bookings],

  getById: (id: string): TBooking | undefined =>
    bookings.find((booking) => booking.id === id),

  create: (booking: TBooking): TBooking => {
    bookings.push(booking);
    return booking;
  },

  delete: (id: string): boolean => {
    const initialLength = bookings.length;
    bookings = bookings.filter((booking) => booking.id !== id);
    return bookings.length < initialLength;
  },

  getByResource: (resource: string): TBooking[] =>
    bookings.filter((booking) => booking.resource === resource),

  getByDate: (date: string): TBooking[] => {
    const targetDate = new Date(date).toDateString();
    return bookings.filter(
      (booking) => new Date(booking.startTime).toDateString() === targetDate
    );
  },
};
