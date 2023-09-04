// dateUtils.ts

import moment from 'moment';

// Function to calculate the number of days between two dates
export const calculateNumberOfDays = (startDate: moment.Moment | null, endDate: moment.Moment | null): number => {
  return startDate && endDate ? endDate.diff(startDate, 'days') : 0;
};

// Function to format a date as "dddd, MMMM D"
export const formatDate = (date: moment.Moment | null): string => {
  return date ? date.format('dddd, MMMM D') : '';
};
