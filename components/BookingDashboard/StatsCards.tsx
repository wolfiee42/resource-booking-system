import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Activity } from "lucide-react";
import { StatsCardsProps } from "./types";

export function StatsCards({
  totalBookings,
  upcomingBookings,
  ongoingBookings,
}: StatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="card-gradient border-border/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-primary">{totalBookings}</p>
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
  );
}
