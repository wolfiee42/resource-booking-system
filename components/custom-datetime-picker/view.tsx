import { useMemo } from "react";
import { CustomDateTimePickerViewProps } from "./types";
import { useDateTimePicker } from "@/components/custom-datetime-picker/context";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CalendarIcon, Clock } from "lucide-react";

export function CustomDateTimePickerView({
  label,
  minDate = new Date(),
}: Readonly<CustomDateTimePickerViewProps>) {
  // Normalize minDate to start of day to allow selection of current date
  const normalizedMinDate = useMemo(() => {
    const date = new Date(minDate);
    date.setHours(0, 0, 0, 0);
    return date;
  }, [minDate]);
  const {
    selectedDate,
    selectedHour,
    selectedMinute,
    selectedPeriod,
    isOpen,
    setSelectedDate,
    setSelectedHour,
    setSelectedMinute,
    setSelectedPeriod,
    setIsOpen,
    displayValue,
  } = useDateTimePicker();

  // Generate hour options (1-12)
  const hours = [];
  for (let i = 1; i <= 12; i++) {
    hours.push({
      value: i.toString(),
      label: i.toString().padStart(2, "0"),
    });
  }

  // Generate minute options (00, 15, 30, 45)
  const minutes = [
    { value: "00", label: "00" },
    { value: "15", label: "15" },
    { value: "30", label: "30" },
    { value: "45", label: "45" },
  ];

  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        {label}
      </Label>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start text-left font-normal bg-background/50 border-border/50 hover:bg-background/80"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayValue}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-0 bg-card/95 backdrop-blur-sm border-border/50"
          align="start"
        >
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="p-4 space-y-4">
              {/* Calendar */}
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Select Date
                </Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < normalizedMinDate}
                  className="rounded-md border-0"
                />
              </div>

              {/* Time Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Select Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">
                      Hour
                    </Label>
                    <Select
                      value={selectedHour}
                      onValueChange={setSelectedHour}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Hour" />
                      </SelectTrigger>
                      <SelectContent>
                        {hours.map((hour) => (
                          <SelectItem key={hour.value} value={hour.value}>
                            {hour.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">
                      Minute
                    </Label>
                    <Select
                      value={selectedMinute}
                      onValueChange={setSelectedMinute}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Min" />
                      </SelectTrigger>
                      <SelectContent>
                        {minutes.map((minute) => (
                          <SelectItem key={minute.value} value={minute.value}>
                            {minute.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-xs text-muted-foreground mb-1 block">
                      Period
                    </Label>
                    <Select
                      value={selectedPeriod}
                      onValueChange={setSelectedPeriod}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setIsOpen(false)}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!selectedDate || !selectedHour || !selectedMinute}
              >
                Confirm Selection
              </Button>
            </CardContent>
          </Card>
        </PopoverContent>
      </Popover>
    </div>
  );
}
