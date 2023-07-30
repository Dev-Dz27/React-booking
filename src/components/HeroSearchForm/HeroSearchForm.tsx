import React, { useEffect, useState } from "react";
import GuestsInput from "./GuestsInput";
import { FocusedInputShape } from "react-dates";
import StayDatesRangeInput from "./StayDatesRangeInput";
import moment from "moment";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import {
  handleDateRangeChange,
  handleGuestsChange,
  setInitialValues,
} from "utils/booking";
import { DateRage, } from "data/types";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import { StaySearchFormProps } from "./StaySearchForm";

const defaultLocationValue = "Tokyo, Japan";
const defaultDateRange = {
  startDate: moment(),
  endDate: moment().add(4, "days"),
};
const defaultGuestValue: GuestsObject = {
  guestAdults: 2,
  guestChildren: 2,
  guestInfants: 1,
};

const StaySearchForm: FC<StaySearchFormProps> = ({
  haveDefaultValue = false,
}) => {
  const dispatch = useDispatch();
  const { location, dateRange, guests } = useSelector(
    (state: RootState) => state.booking
  );

  useEffect(() => {
    setInitialValues(
      haveDefaultValue,
      defaultDateRange,
      defaultLocationValue,
      defaultGuestValue,
      location,
      dateRange,
      guests,
      setLocationInputValue,
      setDateRangeValue,
      setGuestValue,
      dispatch
    );
  }, []);

  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState<GuestsObject>({});
  // const [dateFocused, setDateFocused] = useState<FocusedInputShape | null>(
  //   null
  // );
  const dateFocused:FocusedInputShape | null = null

  // const handleLocationInputChangeWrapper = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const location = event.target.value;
  //   handleLocationChange(location, setLocationInputValue, dispatch);
  // };

  const handleDateRangeChangeWrapper = (dateRange: DateRage) => {
    handleDateRangeChange(dateRange, setDateRangeValue, dispatch);
  };

  const handleGuestsChangeWrapper = (data: GuestsObject) => {
    handleGuestsChange(data, setGuestValue, dispatch);
  };

  const renderForm = () => {
    return (
      <form className="w-full relative mt-8 flex rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
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
