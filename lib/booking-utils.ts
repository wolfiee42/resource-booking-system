import { BookingConflict, BookingStatus, TBooking } from "@/types/booking";
import { bookingStore } from "./booking-store";

const BUFFER_MINUTES = 10;

export function validateBookingTimes(
  startTime: string,
  endTime: string
): string | null {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const now = new Date();

  if (start <= now) {
    return "Start time must be in the future";
  }

  if (end <= start) {
    return "End time must be after start time";
  }

  const durationMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
  if (durationMinutes < 15) {
    return "Booking duration must be at least 15 minutes";
  }

  return null;
}

export function checkBookingConflicts(
  resource: string,
  startTime: string,
  endTime: string,
  excludeId?: string
): BookingConflict {
  const existingBookings = bookingStore
    .getByResource(resource)
    .filter((booking) => (excludeId ? booking.id !== excludeId : true));

  const requestStart = new Date(startTime);
  const requestEnd = new Date(endTime);

  const conflictingBookings: TBooking[] = [];

  for (const booking of existingBookings) {
    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);

    // Add buffer time (10 minutes before and after)
    const bufferedStart = new Date(
      bookingStart.getTime() - BUFFER_MINUTES * 60 * 1000
    );
    const bufferedEnd = new Date(
      bookingEnd.getTime() + BUFFER_MINUTES * 60 * 1000
    );

    // Check if the requested time overlaps with the buffered time
    if (requestStart < bufferedEnd && requestEnd > bufferedStart) {
      conflictingBookings.push(booking);
    }
  }

  if (conflictingBookings.length > 0) {
    const conflictTimes = conflictingBookings
      .map((b) => `${formatTime(b.startTime)} - ${formatTime(b.endTime)}`)
      .join(", ");

    return {
      hasConflict: true,
      conflictingBookings,
      message: `Conflicts with existing bookings (including 10-minute buffer): ${conflictTimes}`,
    };
  }

  return { hasConflict: false };
}

export function getBookingStatus(
  startTime: string,
  endTime: string
): BookingStatus {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "upcoming";
  if (now > end) return "past";
  return "ongoing";
}

export function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
