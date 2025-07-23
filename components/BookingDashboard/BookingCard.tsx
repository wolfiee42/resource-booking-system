import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, Trash2, Activity, Eye } from "lucide-react";
import { type TBooking } from "@/types/booking";
import { getBookingStatus, formatTime, formatDate } from "@/lib/booking-utils";
import { BookingCardProps } from "./types";

export function BookingCard({ booking, onCancel }: BookingCardProps) {
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

  return (
    <Card className="bg-background/30 border-border/30 hover:bg-background/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {getStatusBadge(booking)}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onCancel(booking.id as string)}
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
            {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
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
  );
}
