"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, TrendingUp } from "lucide-react";
import { BookingDashboardProvider, useBookingDashboard } from "./context";
import { StatsCards } from "./StatsCards";
import { BookingFilters } from "./BookingFilters";
import { BookingsList } from "./BookingsList";
import { LoadingState } from "./LoadingState";

interface BookingDashboardProps {
  refreshTrigger: number;
}

function BookingDashboardContent() {
  const {
    loading,
    error,
    filters,
    setFilters,
    totalBookings,
    upcomingBookings,
    ongoingBookings,
    groupedBookings,
    filteredBookings,
    cancelBooking,
    clearFilters,
    refreshBookings,
  } = useBookingDashboard();

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <StatsCards
        totalBookings={totalBookings}
        upcomingBookings={upcomingBookings}
        ongoingBookings={ongoingBookings}
      />

      {/* Main Dashboard */}
      <Card className="card-gradient border-border/20 shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/20 border border-primary/30">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">
                Booking Dashboard
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage and monitor all resource reservations
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Filters */}
          <BookingFilters
            filters={filters}
            onFiltersChange={(newFilters) => setFilters(newFilters)}
            onClearFilters={clearFilters}
            onRefresh={refreshBookings}
          />

          {error && (
            <Alert
              variant="destructive"
              className="bg-destructive/10 border-destructive/20"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Bookings List */}
          <BookingsList
            groupedBookings={groupedBookings}
            filteredBookings={filteredBookings}
            filters={filters}
            onCancelBooking={cancelBooking}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export function BookingDashboard({ refreshTrigger }: BookingDashboardProps) {
  return (
    <BookingDashboardProvider refreshTrigger={refreshTrigger}>
      <BookingDashboardContent />
    </BookingDashboardProvider>
  );
}
