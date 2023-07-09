import React, { useEffect, useState } from "react";
import {
  DayPickerRangeController,
  FocusedInputShape,
  isInclusivelyAfterDay,
} from "react-dates";
import { FC } from "react";
import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import moment from "moment";

export interface StayDatesRangeInputProps {
  defaultValue: DateRage;
  defaultFocus?: FocusedInputShape | null;
  onChange?: (data: DateRage) => void;
  onFocusChange?: (focus: FocusedInputShape | null) => void;
  className?: string;
}

const StayDatesRangeInput: FC<StayDatesRangeInputProps> = ({
  defaultValue,
  onChange,
  defaultFocus = null,
  onFocusChange,
  className = "",
}) => {
  const [focusedInput, setFocusedInput] = useState(defaultFocus);
  const [stateDate, setStateDate] = useState(defaultValue);
  const [focusedInputSectionCheckDate, setFocusedInputSectionCheckDate] =
    useState<FocusedInputShape>("startDate");

  useEffect(() => {
    setStateDate(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setFocusedInput(defaultFocus);
  }, [defaultFocus]);

  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          When's your trip?
        </span>
      </div>
      <div
        className={` relative flex-shrink-0 flex z-10 ${className} ${
          !!focusedInput ? "nc-date-focusedInput" : "nc-date-not-focusedInput"
        }`}
      >
        <DayPickerRangeController
          startDate={stateDate.startDate}
          endDate={stateDate.endDate}
          onDatesChange={(date) => {
            setStateDate(date);
            onChange && onChange(date);
          }}
          focusedInput={focusedInputSectionCheckDate}
          onFocusChange={(focusedInput) =>
            setFocusedInputSectionCheckDate(focusedInput || "startDate")
          }
          initialVisibleMonth={null}
          hideKeyboardShortcutsPanel={false}
          orientation="vertical"
          isOutsideRange={(day) => !isInclusivelyAfterDay(day, moment())}
          verticalHeight={420}
        />
      </div>
    </div>
  );
};

export default StayDatesRangeInput;
