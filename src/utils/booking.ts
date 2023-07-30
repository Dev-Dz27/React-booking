import { Dispatch } from 'redux';
import { setDateRange, setGuests, setLocation } from 'features/bookingSlice';
import moment from 'moment';
import { DateRage } from 'data/types';
import { GuestsObject } from 'components/HeroSearchForm2Mobile/GuestsInput';

// booking.ts

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
  data: GuestsObject,
  setGuestValue: (data: GuestsObject) => void,
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

// Get Initial value if there's any

export const setInitialValues = (
  haveDefaultValue: boolean,
  defaultDateRange: DateRage,
  defaultLocationValue: string,
  defaultGuestValue: GuestsObject,
  location: string, // Add location argument
  dateRange: DateRage, // Add dateRange argument
  guests: GuestsObject, // Add guests argument
  setLocationInputValue: (location: string) => void,
  setDateRangeValue: (dateRange: DateRage) => void,
  setGuestValue: (data: GuestsObject) => void,
  dispatch: Dispatch
) => {
  if (haveDefaultValue) {
    setDateRangeValue(defaultDateRange);
    setLocationInputValue(defaultLocationValue);
    setGuestValue(defaultGuestValue);
  } else {
    if (location || dateRange || guests) {
      setDateRangeValue(dateRange);
      setLocationInputValue(location);
      setGuestValue(guests);
    }
  }
};
