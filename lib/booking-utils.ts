import { BookingConflict, TBooking } from "@/types/booking";
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
