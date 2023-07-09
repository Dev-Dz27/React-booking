import { DateRage } from "components/HeroSearchForm/StaySearchForm";
import { GuestsObject } from "components/HeroSearchForm2Mobile/GuestsInput";
import ModalSelectDate from "components/ModalSelectDate";
import moment from "moment";
import React, { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import converSelectedDateToString from "utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";

const MobileFooterSticky = () => {
  const [selectedDate, setSelectedDate] = useState<DateRage>({
    startDate: moment().add(4, "days"),
    endDate: moment().add(10, "days"),
  });
  const [guestsState, setGuestsState] = useState<GuestsObject>({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });

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
            onSelectDate={setSelectedDate}
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
          onChangeDate={setSelectedDate}
          onChangeGuests={setGuestsState}
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
