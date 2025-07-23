import { Activity, Calendar, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useEffect, useState } from "react";
import { TBooking } from "@/types/booking";
import { getBookingStatus } from "@/lib/booking-utils";

interface BookingDashboardProps {
  refreshTrigger: number;
}

export function BookingDashboard({ refreshTrigger }: BookingDashboardProps) {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(
    (b) => getBookingStatus(b.startTime, b.endTime) === "upcoming"
  ).length;
  const ongoingBookings = bookings.filter(
    (b) => getBookingStatus(b.startTime, b.endTime) === "ongoing"
  ).length;

  if (loading) {
    return (
      <Card className="card-gradient border-border/20">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading your bookings...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {" "}
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="card-gradient border-border/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Bookings
                </p>
                <p className="text-2xl font-bold text-primary">
                  {totalBookings}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Upcoming
                </p>
                <p className="text-2xl font-bold text-blue-400">
                  {upcomingBookings}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-400/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient border-border/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Now
                </p>
                <p className="text-2xl font-bold text-green-400">
                  {ongoingBookings}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-400/60" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
