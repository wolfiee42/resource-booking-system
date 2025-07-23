export type TBookingFormData = {
  resource: string;
  requestedBy: string;
  startTime: string;
  endTime: string;
};

export const RESOURCES = [
  "4K Projector & Screen",
  "DSLR Camera Kit",
  "Portable Microphone Set",
  "Whiteboard & Markers Set",
  "Drawing Tablet (Wacom)",
  "Meeting Pod",
] as const;
