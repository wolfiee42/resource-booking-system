import { useCallback, useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { format } from "date-fns";
import { Card, CardContent } from "./ui/card";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface CustomDateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  minDate?: Date;
  placeholder?: string;
}

export function CustomDateTimePicker({
  value,
  onChange,
  label,
  minDate = new Date(),
  placeholder = "Select date and time",
}: CustomDateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("AM");
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);

      let hour = date.getHours();
      const minute = date.getMinutes();
      const period = hour >= 12 ? "PM" : "AM";

      // Convert to 12-hour format
      if (hour === 0) hour = 12;
      else if (hour > 12) hour -= 12;

      setSelectedHour(hour.toString());
      setSelectedMinute(minute.toString().padStart(2, "0"));
      setSelectedPeriod(period);
    } else {
      // Reset state when value is empty
      setSelectedDate(undefined);
      setSelectedHour("");
      setSelectedMinute("");
      setSelectedPeriod("AM");
    }
  }, [value]);

  // Memoized function to construct and emit the datetime
  const updateDateTime = useCallback(() => {
    if (selectedDate && selectedHour && selectedMinute) {
      const newDate = new Date(selectedDate);
      let hour = Number.parseInt(selectedHour);

      // Convert to 24-hour format
      if (selectedPeriod === "PM" && hour !== 12) hour += 12;
      else if (selectedPeriod === "AM" && hour === 12) hour = 0;

      newDate.setHours(hour, Number.parseInt(selectedMinute), 0, 0);

      // Only call onChange if the new value is different from current value
      const newISOString = newDate.toISOString();
      if (newISOString !== value) {
        onChange(newISOString);
      }
    }
  }, [
    selectedDate,
    selectedHour,
    selectedMinute,
    selectedPeriod,
    onChange,
    value,
  ]);

  // Update datetime when components change, but debounce to prevent loops
  useEffect(() => {
    const timeoutId = setTimeout(updateDateTime, 0);
    return () => clearTimeout(timeoutId);
  }, [updateDateTime]);

  const isDateTimeSelected = selectedDate && selectedHour && selectedMinute;

  const formattedDate = selectedDate
    ? format(selectedDate, "MMM dd, yyyy")
    : "";

  const displayValue = isDateTimeSelected
    ? `${formattedDate} at ${selectedHour}:${selectedMinute} ${selectedPeriod}`
    : "";

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
            {displayValue || placeholder}
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
                  disabled={(date) => date < minDate}
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
