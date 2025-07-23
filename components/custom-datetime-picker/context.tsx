import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import {
  DateTimePickerContextValue,
  DateTimePickerProviderProps,
} from "./types";

const DateTimePickerContext = createContext<
  DateTimePickerContextValue | undefined
>(undefined);

export function DateTimePickerProvider({
  children,
  value,
  onChange,
  minDate = new Date(),
  placeholder = "Select date and time",
}: DateTimePickerProviderProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("AM");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Reset state when value is empty
  const resetState = useCallback(() => {
    setSelectedDate(undefined);
    setSelectedHour("");
    setSelectedMinute("");
    setSelectedPeriod("AM");
  }, []);

  // Parse incoming value and set state
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
      resetState();
    }
  }, [value, resetState]);

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

  // Computed values
  const isDateTimeSelected = Boolean(
    selectedDate && selectedHour && selectedMinute
  );

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "";

  const displayValue = isDateTimeSelected
    ? `${formattedDate} at ${selectedHour}:${selectedMinute} ${selectedPeriod}`
    : placeholder;

  const contextValue: DateTimePickerContextValue = useMemo(
    () => ({
      // State
      selectedDate,
      selectedHour,
      selectedMinute,
      selectedPeriod,
      isOpen,
      // Actions
      setSelectedDate,
      setSelectedHour,
      setSelectedMinute,
      setSelectedPeriod,
      setIsOpen,
      updateDateTime,
      resetState,
      // Computed values
      formattedDate,
      displayValue,
      isDateTimeSelected,
    }),
    [
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
      updateDateTime,
      resetState,
      formattedDate,
      displayValue,
      isDateTimeSelected,
    ]
  );

  return (
    <DateTimePickerContext.Provider value={contextValue}>
      {children}
    </DateTimePickerContext.Provider>
  );
}

export function useDateTimePicker() {
  const context = useContext(DateTimePickerContext);
  if (!context) {
    throw new Error(
      "useDateTimePicker must be used within a DateTimePickerProvider"
    );
  }
  return context;
}
