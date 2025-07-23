import { TBooking } from "@/types/booking";

export type BookingFilters = {
  resource: string;
  date: string;
};

export type BookingDashboardContextType = {
  // State
  bookings: TBooking[];
  filteredBookings: TBooking[];
  loading: boolean;
  error: string;
  filters: BookingFilters;

  // Computed values
  totalBookings: number;
  upcomingBookings: number;
  ongoingBookings: number;
  groupedBookings: Record<string, TBooking[]>;

  // Actions
  setFilters: React.Dispatch<React.SetStateAction<BookingFilters>>;
  fetchBookings: () => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  clearFilters: () => void;
  refreshBookings: () => void;
};

export type StatsCardsProps = {
  totalBookings: number;
  upcomingBookings: number;
  ongoingBookings: number;
};

export type BookingFiltersProps = {
  filters: {
    resource: string;
    date: string;
  };
  onFiltersChange: (filters: { resource: string; date: string }) => void;
  onClearFilters: () => void;
  onRefresh: () => void;
};

export type BookingCardProps = {
  booking: TBooking;
  onCancel: (id: string) => void;
};

export type BookingsListProps = {
  groupedBookings: Record<string, TBooking[]>;
  filteredBookings: TBooking[];
  filters: {
    resource: string;
    date: string;
  };
  onCancelBooking: (id: string) => void;
};
