import { DateRage } from "data/types";
import React, { useState, useEffect } from "react";
import GuestsInput, { GuestsInputProps, GuestsObject } from "./GuestsInput";
import StayDatesRangeInput from "./StayDatesRangeInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "features/store";
import moment from "moment";
import { handleDateRangeChange, handleGuestsChange,  setInitialValues } from "utils/booking";

const StaySearchForm = () => {
  // DEFAULT DATA FOR ARCHIVE PAGE
  const defaultLocationValue = "Tokyo, Jappan";
  const defaultDateRange = {
    startDate: moment(),
    endDate: moment().add(4, "days"),
  };
  // Field name
  const [fieldNameShow, setFieldNameShow] = useState<
    "location" | "dates" | "guests"
  >("location");
  //
  const [guestInput] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });
  const defaultGuestValue: GuestsInputProps["defaultValue"] = {
    guestAdults: 2,
    guestChildren: 2,
    guestInfants: 1,
  };
  const [dateRangeValue, setDateRangeValue] = useState<DateRage>({
    startDate: null,
    endDate: null,
  });
  const [, setLocationInputValue] = useState("");
  const [guestValue, setGuestValue] = useState<GuestsObject>({});

  const dispatch = useDispatch();
  const { location, dateRange, guests } = useSelector(
    (state: RootState) => state.booking
  );

  const haveDefaultValue = false;

  useEffect(() => {
    setInitialValues(
      haveDefaultValue,
      defaultDateRange,
      defaultLocationValue,
      defaultGuestValue,
      location, // Pass the location here
      dateRange, // Pass the dateRange here
      guests, // Pass the guests here
      setLocationInputValue,
      setDateRangeValue,
      setGuestValue,
      dispatch
    );
  }, []);


  // const handleLocationInputChangeWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const location = event.target.value;
  //   handleLocationChange(location, setLocationInputValue, dispatch);
  // };

  const handleDateRangeChangeWrapper = (dateRange: DateRage) => {
    handleDateRangeChange(dateRange, setDateRangeValue, dispatch);
  };

  const handleGuestsChangeWrapper = (data: GuestsObject) => {
    handleGuestsChange(data, setGuestValue, dispatch);
  };


  const renderInputLocation = () => {
    const isActive = fieldNameShow === "location";
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {/* {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("location")}
          >
            <span className="text-neutral-400">Where</span>
            <span>{locationInputTo || "Location"}</span>
          </button>
        ) : (
          <LocationInput
            defaultValue={locationInputValue}
            onChange={handleLocationInputChangeWrapper}
          />
        )} */}
      </div>
    );
  };

  const renderInputDates = () => {
    const isActive = fieldNameShow === "dates";
    const startDateString = dateRangeValue.startDate?.format("MMM DD");
    const endDateString =
      dateRangeValue.endDate?.get("month") !==
      dateRangeValue.startDate?.get("month")
        ? dateRangeValue.endDate?.format("MMM DD")
        : dateRangeValue.endDate?.format("DD");
    const dateSelected =
      startDateString && endDateString
        ? `${startDateString} - ${endDateString}`
        : `${startDateString || endDateString || ""}`;
    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4  `}
            onClick={() => setFieldNameShow("dates")}
          >
            <span className="text-neutral-400">When</span>
            <span>{dateSelected || "Add date"}</span>
          </button>
        ) : (
          <StayDatesRangeInput
            defaultValue={dateRangeValue}
            onChange={handleDateRangeChangeWrapper}
          />
        )}
      </div>
    );
  };

  const renderInputGuests = () => {
    const isActive = fieldNameShow === "guests";
    let guestSelected = "";
    if (guestInput.guestAdults || guestInput.guestChildren) {
      const guest =
        (guestInput.guestAdults || 0) + (guestInput.guestChildren || 0);
      guestSelected += `${guest} guests`;
    }

    if (guestInput.guestInfants) {
      guestSelected += `, ${guestInput.guestInfants} infants`;
    }

    return (
      <div
        className={`w-full bg-white dark:bg-neutral-800 overflow-hidden ${
          isActive
            ? "rounded-2xl shadow-lg"
            : "rounded-xl shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)]"
        }`}
      >
        {!isActive ? (
          <button
            className={`w-full flex justify-between text-sm font-medium p-4`}
            onClick={() => setFieldNameShow("guests")}
          >
            <span className="text-neutral-400">Who</span>
            <span>{guestSelected || `Add guests`}</span>
          </button>
        ) : (
          <GuestsInput 
          defaultValue={guestValue}
          onChange={handleGuestsChangeWrapper}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="w-full space-y-5">
        {/*  */}
        {renderInputLocation()}
        {/*  */}
        {renderInputDates()}
        {/*  */}
        {renderInputGuests()}
      </div>
    </div>
  );
};

export default StaySearchForm;
