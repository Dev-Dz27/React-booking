import { DateRage } from "data/types"; 

const converSelectedDateToString = ({ startDate, endDate }: DateRage) => {
  const startDateString = startDate?.format("MMM DD");
  const endDateString =
    endDate?.get("month") !== startDate?.get("month")
      ? endDate?.format("MMM DD")
      : endDate?.format("DD");
  const dateSelectedString =
    startDateString && endDateString
      ? `${startDateString} - ${endDateString}`
      : `${startDateString || endDateString || ""}`;
  return dateSelectedString;
};

export default converSelectedDateToString;
