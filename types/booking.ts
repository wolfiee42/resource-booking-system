export type TBooking = {
  id?: string;
  resource: string;
  requestedBy: string;
  startTime: string;
  endTime: string;
  createdAt?: string;
};

export const RESOURCES = [
  "4K Projector & Screen",
  "DSLR Camera Kit",
  "Portable Microphone Set",
  "Whiteboard & Markers Set",
  "Drawing Tablet (Wacom)",
  "Meeting Pod",
] as const;

export type BookingRequest = {
  resource: string;
  startTime: string;
  endTime: string;
  requestedBy: string;
};

export type BookingConflict = {
  hasConflict: boolean;
  conflictingBookings?: TBooking[];
  message?: string;
};

export type BookingStatus = "upcoming" | "ongoing" | "past";
