import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";

export function LoadingState() {
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
