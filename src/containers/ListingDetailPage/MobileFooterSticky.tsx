import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "features/store";
import moment from "moment";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ModalSelectDate from "components/ModalSelectDate";
import ModalReserveMobile from "./ModalReserveMobile";
import { DateRage } from "data/types";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import { handleGuestsChange,  } from "utils/booking";
import { setDateRange } from "features/bookingSlice";

const MobileFooterSticky = () => {
  const dispatch = useDispatch();
  const {  dateRange, guests } = useSelector(
    (state: RootState) => state.booking
  );

  // Initialize the state with default values or from the Redux store
  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: dateRange.startDate ? moment(dateRange.startDate) : moment().add(4, "days"),
    endDate: dateRange.endDate ? moment(dateRange.endDate) : moment().add(10, "days"),
  });

  const [guestsState, setGuestsState] = useState<GuestsObject>({
    guestAdults: guests.guestAdults ?? 0,
    guestChildren: guests.guestChildren ?? 0,
    guestInfants: guests.guestInfants ?? 0,
  });

  // Update Redux state with selected date range
  const handleDateChange = (dates: DateRage) => {
    setSelectedDate(dates);
    dispatch(setDateRange(dates));
  };

  // Handle guests change using the helper function
  const handleGuestsChangeWrapper = (data: GuestsObject) => {
    handleGuestsChange(data, setGuestsState, dispatch);
  };

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-20">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-xl font-semibold">
            $311
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /night
            </span>
          </span>
          <ModalSelectDate
            defaultValue={selectedDate}
            onSelectDate={handleDateChange}
            renderChildren={({ defaultValue, openModal }) => (
              <span
                onClick={openModal}
                className="block text-sm underline font-medium"
              >
                {converSelectedDateToString(selectedDate)}
              </span>
            )}
          />
        </div>
        <ModalReserveMobile
          defaultGuests={guestsState}
          defaultDate={selectedDate}
          onChangeGuests={handleGuestsChangeWrapper}
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={openModal}
            >
              Reserve
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  );
};

export default MobileFooterSticky;
