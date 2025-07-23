import { ReactNode } from "react";

export type CustomDateTimePickerProps = {
  value: string;
  onChange: (value: string) => void;
  label: string;
  minDate?: Date;
  placeholder?: string;
};

export type CustomDateTimePickerViewProps = {
  label: string;
  minDate?: Date;
};

export type DateTimePickerState = {
  selectedDate?: Date;
  selectedHour: string;
  selectedMinute: string;
  selectedPeriod: string;
  isOpen: boolean;
};

export type DateTimePickerActions = {
  setSelectedDate: (date: Date | undefined) => void;
  setSelectedHour: (hour: string) => void;
  setSelectedMinute: (minute: string) => void;
  setSelectedPeriod: (period: string) => void;
  setIsOpen: (open: boolean) => void;
  updateDateTime: () => void;
  resetState: () => void;
};

export interface DateTimePickerContextValue
  extends DateTimePickerState,
    DateTimePickerActions {
  formattedDate: string;
  displayValue: string;
  isDateTimeSelected: boolean;
}

export type DateTimePickerProviderProps = {
  children: ReactNode;
  value: string;
  onChange: (value: string) => void;
  minDate?: Date;
  placeholder?: string;
};
