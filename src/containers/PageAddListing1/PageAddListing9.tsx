import NcInputNumber from "components/NcInputNumber/NcInputNumber";
import useWindowSize from "hooks/useWindowResize";
import moment from "moment";
import React, { FC, useState } from "react";
import { DayPickerSingleDateController } from "react-dates";
import CommonLayout from "./CommonLayout";

export interface PageAddListing9Props {}

const PageAddListing9: FC<PageAddListing9Props> = () => {
  const [dates, setDates] = useState<moment.Moment[]>([]);

  function handleDateChange(date: moment.Moment) {
    const wasPreviouslyPicked = dates.some((d) => d.isSame(date));
    if (wasPreviouslyPicked) {
      setDates((previousDates) => previousDates.filter((d) => !d.isSame(date)));
    } else {
      setDates((previousDates) => [...previousDates, date]);
    }
  }

  const windowSize = useWindowSize();

  const getDaySize = () => {
    if (windowSize.width <= 600) {
      return undefined;
    }
    return 56;
  };

  return (
    <CommonLayout
      index="09"
      backtHref="/add-listing-8"
      nextHref="/add-listing-10"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">How long can guests stay?</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Shorter trips can mean more reservations, but you'll turn over your
            space more often.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* FORM */}
        <div className="space-y-7">
          {/* ITEM */}
          <NcInputNumber label="Nights min" defaultValue={1} />
          <NcInputNumber label="Nights max" defaultValue={99} />
        </div>

        {/*  */}
        <div>
          <h2 className="text-2xl font-semibold">Set your availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Editing your calendar is easy—just select a date to block or unblock
            it. You can always make changes after you publish.
          </span>
        </div>

        <div className="nc-SetYourAvailabilityData">
          <DayPickerSingleDateController
            onDateChange={(e) => e && handleDateChange(e)}
            focused={false}
            onFocusChange={console.log}
            date={null}
            isDayHighlighted={(day) => dates.some((d) => d.isSame(day, "day"))}
            keepOpenOnDateSelect
            daySize={getDaySize()}
            initialVisibleMonth={null}
          />
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing9;
