"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Filter,
  Trash2,
  RefreshCw,
  AlertCircle,
  Activity,
  TrendingUp,
  Eye,
} from "lucide-react";
import { type TBooking, RESOURCES } from "@/types/booking";
import {
  getBookingStatus,
  formatTime,
  formatDate,
  groupBookingsByResource,
  sortBookingsByTime,
} from "@/lib/booking-utils";
import { Separator } from "./ui/separator";

interface BookingDashboardProps {
  refreshTrigger: number;
}

export function BookingDashboard({ refreshTrigger }: BookingDashboardProps) {
  const [bookings, setBookings] = useState<TBooking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<TBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
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

  useEffect(() => {
    fetchBookings();
  }, [refreshTrigger]);

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

  const groupedBookings = groupBookingsByResource(filteredBookings);
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
          <div className="flex flex-col sm:flex-row gap-4 p-4 bg-background/30 rounded-lg border border-border/30">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-primary" />
              <Select
                value={filters.resource}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, resource: value }))
                }
              >
                <SelectTrigger className="w-[200px] bg-background/50 border-border/50">
                  <SelectValue placeholder="Filter by resource" />
                </SelectTrigger>
                <SelectContent className="bg-card/95 backdrop-blur-sm border-border/50">
                  <SelectItem value="All Resources">All Resources</SelectItem>
                  {RESOURCES.map((resource) => (
                    <SelectItem key={resource} value={resource}>
                      {resource}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              type="date"
              placeholder="Filter by date"
              value={filters.date}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, date: e.target.value }))
              }
              className="w-[200px] bg-background/50 border-border/50"
            />

            <Button
              variant="outline"
              onClick={() =>
                setFilters({ resource: "All Resources", date: "" })
              }
              className="bg-background/50 border-border/50 hover:bg-background/80"
            >
              Clear Filters
            </Button>

            <Button
              variant="outline"
              onClick={fetchBookings}
              className="ml-auto bg-background/50 border-border/50 hover:bg-background/80"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>

          {error && (
            <Alert
              variant="destructive"
              className="bg-destructive/10 border-destructive/20"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-4 rounded-full bg-muted/20 w-fit mx-auto mb-4">
                <Calendar className="h-12 w-12 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
              <p className="text-muted-foreground">
                {filters.resource !== "All Resources" || filters.date
                  ? "Try adjusting your filters to see more results"
                  : "Create your first booking to get started"}
              </p>
            </div>
          ) : (
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
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  cancelBooking(booking.id as string)
                                }
                                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-medium">
                                {formatTime(booking.startTime)} -{" "}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
}
