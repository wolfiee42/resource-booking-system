import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, RefreshCw } from "lucide-react";
import { RESOURCES } from "@/types/booking";
import { BookingFiltersProps } from "./types";

export function BookingFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  onRefresh,
}: BookingFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-background/30 rounded-lg border border-border/30">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-primary" />
        <Select
          value={filters.resource}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, resource: value })
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
        onChange={(e) => onFiltersChange({ ...filters, date: e.target.value })}
        className="w-[200px] bg-background/50 border-border/50"
      />

      <Button
        variant="outline"
        onClick={onClearFilters}
        className="bg-background/50 border-border/50 hover:bg-background/80"
      >
        Clear Filters
      </Button>

      <Button
        variant="outline"
        onClick={onRefresh}
        className="ml-auto bg-background/50 border-border/50 hover:bg-background/80"
      >
        <RefreshCw className="h-4 w-4 mr-2" />
        Refresh
      </Button>
    </div>
  );
}
