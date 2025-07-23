import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatDate,
  formatTime,
  getBookingStatus,
  groupBookingsByResource,
} from "@/lib/booking-utils";
import { TBooking } from "@/types/booking";

import {
  Activity,
  Calendar,
  Clock,
  Eye,
  MapPin,
  RefreshCw,
  Trash2,
  TrendingUp,
  User,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "@radix-ui/react-select";

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

  const getStatusBadge = (booking: TBooking) => {
    const status = getBookingStatus(booking.startTime, booking.endTime);
    const variants = {
      upcoming: {
        variant: "secondary" as const,
        icon: Clock,
        color: "text-blue-400",
      },
      ongoing: {
        variant: "default" as const,
        icon: Activity,
        color: "text-green-400",
      },
      past: { variant: "outline" as const, icon: Eye, color: "text-gray-400" },
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge
        variant={config.variant}
        className="capitalize flex items-center gap-1"
      >
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status}
      </Badge>
    );
  };

  const groupedBookings = groupBookingsByResource(bookings);
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

      {/* Main Cards */}
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
          <div className="space-y-8">
            {Object.entries(groupedBookings).map(
              ([resource, resourceBookings]) => (
                <div key={resource}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{resource}</h3>
                    <Badge
                      variant="secondary"
                      className="bg-primary/20 text-primary border-primary/30"
                    >
                      {resourceBookings.length} bookings
                    </Badge>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {resourceBookings.map((booking) => (
                      <Card
                        key={booking.id}
                        className="bg-background/30 border-border/30 hover:bg-background/50 transition-colors"
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            {getStatusBadge(booking)}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">
                              {formatTime(booking.startTime)} -
                              {formatTime(booking.endTime)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(booking.startTime)}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>{booking.requestedBy}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {Object.keys(groupedBookings).indexOf(resource) <
                    Object.keys(groupedBookings).length - 1 && (
                    <Separator className="mt-8 bg-border/30" />
                  )}
                </div>
              )
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
