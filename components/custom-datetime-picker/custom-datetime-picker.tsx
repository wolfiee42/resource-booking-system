import { DateTimePickerProvider } from "./context";
import { CustomDateTimePickerProps } from "./types";
import { CustomDateTimePickerView } from "./view";

export function CustomDateTimePicker({
  value,
  onChange,
  label,
  minDate = new Date(),
  placeholder = "Select date and time",
}: CustomDateTimePickerProps) {
  return (
    <DateTimePickerProvider
      value={value}
      onChange={onChange}
      minDate={minDate}
      placeholder={placeholder}
    >
      <CustomDateTimePickerView label={label} minDate={minDate} />
    </DateTimePickerProvider>
  );
}
