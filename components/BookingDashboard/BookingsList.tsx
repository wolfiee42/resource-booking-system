import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { BookingCard } from "./BookingCard";
import { BookingsListProps } from "./types";

export function BookingsList({
  groupedBookings,
  filteredBookings,
  filters,
  onCancelBooking,
}: BookingsListProps) {
  if (filteredBookings.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-8">
      {Object.entries(groupedBookings).map(([resource, resourceBookings]) => (
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
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={onCancelBooking}
              />
            ))}
          </div>

          {Object.keys(groupedBookings).indexOf(resource) <
            Object.keys(groupedBookings).length - 1 && (
            <Separator className="mt-8 bg-border/30" />
          )}
        </div>
      ))}
    </div>
  );
}
