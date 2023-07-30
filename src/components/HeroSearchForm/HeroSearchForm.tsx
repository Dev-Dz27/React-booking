import React, { useEffect, useState } from "react";
import GuestsInput, { GuestsInputProps } from "./GuestsInput";
import { FocusedInputShape } from "react-dates";
import StayDatesRangeInput from "./StayDatesRangeInput";
import moment from "moment";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { handleLocationChange, handleDateRangeChange, handleGuestsChange } from "utils/booking";


export interface DateRage {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
}

export interface StaySearchFormProps {
  haveDefaultValue?: boolean;
}

type GuestsObject = {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
};

// DEFAULT DATA FOR ARCHIVE PAGE
const defaultLocationValue = "Tokyo, Jappan";
const defaultDateRange = {
  startDate: moment(),
  endDate: moment().add(4, "days"),
};
const defaultGuestValue: GuestsInputProps["defaultValue"] = {
  guestAdults: 2,
  guestChildren: 2,
  guestInfants: 1,
};

const StaySearchForm: FC<StaySearchFormProps> = ({
  haveDefaultValue = false,
}) => {
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [locationInputValue, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState<GuestsObject>({});

  const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
    null
  );

  const dispatch = useDispatch();
  const { location, dateRange, guests } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    if (haveDefaultValue) {
      setDateRangeValue(defaultDateRange);
      setLocationInputValue(defaultLocationValue);
      setGuestValue(defaultGuestValue);
    } else if (location || dateRange || guests) {
      setDateRangeValue(dateRange);
      setLocationInputValue(location);
      setGuestValue(guests);
    }
  }, []);

  const handleLocationInputChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    const location = event.target.value;
    // Use the correct imported helper function
    handleLocationChange(location, setLocationInputValue, dispatch);
  };

  const handleDateRangeChangeWrapper = (dateRange: DateRage) => {
    // Use the correct imported helper function
    handleDateRangeChange(dateRange, setDateRangeValue, dispatch);
  };

  const handleGuestsChangeWrapper = (data: GuestsObject) => {
    // Use the correct imported helper function
    handleGuestsChange(data, setGuestValue, dispatch);
  };
  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
        {/* <LocationInput
          defaultValue={locationInputValue}
          onChange={handleLocationInputChangeWrapper}
          onInputDone={() => setDateFocused("startDate")}
          className="flex-[1.5]"
        /> */}
        <StayDatesRangeInput
          defaultValue={dateRangeValue}
          defaultFocus={dateFocused}
          onChange={handleDateRangeChangeWrapper}
          className="flex-[2]"
        />
        <GuestsInput
          defaultValue={guestValue}
          onChange={handleGuestsChangeWrapper}
          className="flex-[1.2]"
        />
      </form>
    );
  };

  return renderForm();
};

export default StaySearchForm;
