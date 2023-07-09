import React, { useEffect, useState } from "react";
import { SingleDatePicker, AnchorDirectionShape } from "react-dates";
import { FC } from "react";
import moment from "moment";
import useWindowSize from "hooks/useWindowResize";
import useNcId from "hooks/useNcId";

export interface ExperiencesDateSingleInputProps {
  defaultValue: moment.Moment | null;
  onChange?: (date: moment.Moment | null) => void;
  defaultFocus?: boolean;
  fieldClassName?: string;
  onFocusChange?: (focused: boolean) => void;
  className?: string;
  anchorDirection?: AnchorDirectionShape;
}

const ExperiencesDateSingleInput: FC<ExperiencesDateSingleInputProps> = ({
  defaultValue,
  onChange,
  defaultFocus = false,
  onFocusChange,
  anchorDirection,
  className = "",
  fieldClassName = "[ nc-hero-field-padding--small ]",
}) => {
  const [focusedInput, setFocusedInput] = useState(defaultFocus);
  const [startDate, setStartDate] = useState(defaultValue);
  const startDateId = useNcId();

  const windowSize = useWindowSize();

  useEffect(() => {
    setStartDate(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  useEffect(() => {
    if (onChange) {
      onChange(startDate);
    }
  }, [startDate]);

  const handleDateFocusChange = (arg: { focused: boolean }) => {
    setFocusedInput(arg.focused);
    onFocusChange && onFocusChange(arg.focused);
  };

  const renderInputCheckInDate = () => {
    const focused = focusedInput;
    return (
      <div
        className={`flex w-full relative ${fieldClassName} items-center space-x-3 cursor-pointer ${
          focused ? "nc-hero-field-focused--2" : ""
        }`}
      >
        <div className="flex-1">
          <span className="block font-semibold">
            {startDate ? startDate.format("DD MMM") : "Date"}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {startDate ? "Date" : `Add date`}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`ExperiencesDateSingleInput relative flex ${className} ${
        !!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
      }`}
    >
      <div className="absolute inset-0 flex">
        <SingleDatePicker
          date={startDate}
          onDateChange={(date) => setStartDate(date)}
          id={startDateId}
          focused={focusedInput}
          daySize={windowSize.width > 425 ? 50 : undefined}
          orientation={"horizontal"}
          onFocusChange={handleDateFocusChange}
          noBorder
          hideKeyboardShortcutsPanel
          numberOfMonths={1}
          anchorDirection={anchorDirection}
          showClearDate
          reopenPickerOnClearDate
        />
      </div>

      {renderInputCheckInDate()}
    </div>
  );
};

export default ExperiencesDateSingleInput;
