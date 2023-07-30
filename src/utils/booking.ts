import { Dispatch } from 'redux';
import { setDateRange, setGuests, setLocation } from 'features/bookingSlice';
import moment from 'moment';
import { DateRage } from 'data/types';

export const handleLocationChange = (
  location: string,
  setLocationInputValue: (location: string) => void,
  dispatch: Dispatch
) => {
  setLocationInputValue(location);
  dispatch(setLocation(location));
};

export const handleDateRangeChange = (
  dateRange: DateRage,
  setDateRangeValue: (dateRange: DateRage) => void,
  dispatch: Dispatch
) => {
  setDateRangeValue(dateRange);
  const serializedRange: DateRage = {
    startDate: dateRange.startDate ? moment(dateRange.startDate) : null,
    endDate: dateRange.endDate ? moment(dateRange.endDate) : null,
  };
  dispatch(setDateRange(serializedRange));
};

export const handleGuestsChange = (
  data: { guestAdults?: number; guestChildren?: number; guestInfants?: number },
  setGuestValue: (data: { guestAdults?: number; guestChildren?: number; guestInfants?: number }) => void,
  dispatch: Dispatch
) => {
  const guests = {
    guestAdults: data.guestAdults ?? 0,
    guestChildren: data.guestChildren ?? 0,
    guestInfants: data.guestInfants ?? 0,
  };
  setGuestValue(guests);
  dispatch(setGuests(guests));
};
