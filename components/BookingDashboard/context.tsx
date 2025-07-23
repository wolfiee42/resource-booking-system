"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { type TBooking } from "@/types/booking";
import {
  getBookingStatus,
  sortBookingsByTime,
  groupBookingsByResource,
} from "@/lib/booking-utils";
import { BookingDashboardContextType, BookingFilters } from "./types";

const BookingDashboardContext = createContext<
  BookingDashboardContextType | undefined
>(undefined);

export function useBookingDashboard() {
  const context = useContext(BookingDashboardContext);
  if (context === undefined) {
    throw new Error(
      "useBookingDashboard must be used within a BookingDashboardProvider"
    );
  }
  return context;
}

interface BookingDashboardProviderProps {
  children: React.ReactNode;
  refreshTrigger: number;
}

export function BookingDashboardProvider({
  children,
  refreshTrigger,
}: BookingDashboardProviderProps) {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<TBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState<BookingFilters>({
    resource: "All Resources",
    date: "",
  });

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/bookings");
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      const data = await response.json();
      setBookings(data.bookings);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to cancel booking");
      }

      await fetchBookings();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to cancel booking");
    }
  };

  const clearFilters = () => {
    setFilters({ resource: "All Resources", date: "" });
  };

  const refreshBookings = () => {
    fetchBookings();
  };

  // Effect to fetch bookings when refreshTrigger changes
  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

  // Effect to filter bookings when bookings or filters change
  useEffect(() => {
    let filtered = [...bookings];

    if (filters.resource !== "All Resources") {
      filtered = filtered.filter(
        (booking) => booking.resource === filters.resource
      );
    }

    if (filters.date) {
      const targetDate = new Date(filters.date).toDateString();
      filtered = filtered.filter(
        (booking) => new Date(booking.startTime).toDateString() === targetDate
      );
    }

    setFilteredBookings(sortBookingsByTime(filtered));
  }, [bookings, filters]);

  // Computed values
  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(
    (b) => getBookingStatus(b.startTime, b.endTime) === "upcoming"
  ).length;
  const ongoingBookings = bookings.filter(
    (b) => getBookingStatus(b.startTime, b.endTime) === "ongoing"
  ).length;
  const groupedBookings = groupBookingsByResource(filteredBookings);

  const value: BookingDashboardContextType = useMemo(
    () => ({
      // State
      bookings,
      filteredBookings,
      loading,
      error,
      filters,

      // Computed values
      totalBookings,
      upcomingBookings,
      ongoingBookings,
      groupedBookings,

      // Actions
      setFilters,
      fetchBookings,
      cancelBooking,
      clearFilters,
      refreshBookings,
    }),
    [
      bookings,
      filteredBookings,
      loading,
      error,
      filters,
      totalBookings,
      upcomingBookings,
      ongoingBookings,
      groupedBookings,
      fetchBookings,
      cancelBooking,
    ]
  );

  return (
    <BookingDashboardContext.Provider value={value}>
      {children}
    </BookingDashboardContext.Provider>
  );
}
