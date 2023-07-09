import React, { useEffect, useState } from "react";
import {
  AnchorDirectionShape,
  DateRangePicker,
  FocusedInputShape,
} from "react-dates";
import { DateRage } from "./StaySearchForm";
import { FC } from "react";
import useWindowSize from "hooks/useWindowResize";
import useNcId from "hooks/useNcId";

export interface StayDatesRangeInputProps {
  defaultValue: DateRage;
  defaultFocus?: FocusedInputShape | null;
  onChange?: (data: DateRage) => void;
  onFocusChange?: (focus: FocusedInputShape | null) => void;
  className?: string;
  fieldClassName?: string;
  wrapClassName?: string;
  numberOfMonths?: number;
  anchorDirection?: AnchorDirectionShape;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  defaultValue,
  onChange,
  defaultFocus = null,
  onFocusChange,
  fieldClassName = "[ nc-hero-field-padding--small ]",
  wrapClassName = "divide-y divide-neutral-200 dark:divide-neutral-700 lg:divide-y-0 md:border-l md:border-r border-neutral-200 dark:border-neutral-700 lg:border-none",
  numberOfMonths,
  anchorDirection,
  className = "",
}) => {
  const [focusedInput, setFocusedInput] = useState(defaultFocus);
  const [stateDate, setStateDate] = useState(defaultValue);
  const startDateId = useNcId();
  const endDateId = useNcId();
  const windowSize = useWindowSize();

  useEffect(() => {
    setStateDate(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  useEffect(() => {
    if (onChange) {
      onChange(stateDate);
    }
  }, [stateDate]);

  const handleDateFocusChange = (focus: FocusedInputShape | null) => {
    setFocusedInput(focus);
    onFocusChange && onFocusChange(focus);
  };

  const renderInputCheckInDate = () => {
    const focused = focusedInput === "startDate";
    return (
      <div
        className={`relative flex items-center flex-1 ${fieldClassName} space-x-3 cursor-pointer ${
          focused ? "nc-hero-field-focused--2" : " "
        }`}
      >
        <div className="flex-1">
          <span className="block font-semibold">
            {stateDate.startDate
              ? stateDate.startDate.format("DD MMM")
              : "Check in"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {stateDate.startDate ? "Check in" : `Add date`}
          </span>
        </div>
      </div>
    );
  };

  const renderInputCheckOutDate = () => {
    const focused = focusedInput === "endDate";
    return (
      <div
        className={`relative flex items-center flex-1 ${fieldClassName} space-x-3 cursor-pointer ${
          focused ? "nc-hero-field-focused--2" : " "
        }`}
      >
        <div className="flex-1">
          <span className="block font-semibold">
            {stateDate.endDate
              ? stateDate.endDate.format("DD MMM")
              : "Check out"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {stateDate.endDate ? "Check out" : `Add date`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`StayDatesRangeInput relative flex-shrink-0 flex z-10 ${className} ${
        !!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
      }`}
    >
      <div className="absolute inset-0 flex">
        <DateRangePicker
          startDate={stateDate.startDate}
          endDate={stateDate.endDate}
          focusedInput={focusedInput}
          onDatesChange={(date) => setStateDate(date)}
          onFocusChange={handleDateFocusChange}
          numberOfMonths={
            numberOfMonths || (windowSize.width <= 1024 ? 1 : undefined)
          }
          startDateId={startDateId}
          endDateId={endDateId}
          daySize={windowSize.width > 500 ? 48 : undefined}
          orientation={"horizontal"}
          showClearDates
          noBorder
          hideKeyboardShortcutsPanel
          anchorDirection={anchorDirection}
          customArrowIcon={<div />}
          reopenPickerOnClearDates
        />
      </div>

      <div className={`grid grid-cols-2 flex-1 relative  ${wrapClassName}`}>
        {renderInputCheckInDate()}

        {renderInputCheckOutDate()}
      </div>
    </div>
  );
};

export default StayDatesRangeInput;
