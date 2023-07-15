import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { DateRage } from 'data/types';

// Define the initial state of the booking component

interface BookingState {
    location: string;
    dateRange: DateRage;
    guests: {
      guestAdults: number;
      guestChildren: number;
      guestInfants: number;
    };
  }
  
  const initialState: BookingState = {
    location: '',
    dateRange: {
      startDate: moment(),
      endDate: moment().add(4, 'days'),
    },
    guests: {
      guestAdults: 2,
      guestChildren: 2,
      guestInfants: 1,
    },
  };
// Create a new slice using the createSlice function:
  const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
      setLocation(state, action: PayloadAction<string>) {
        state.location = action.payload;
      },
      setDateRange(state, action: PayloadAction<DateRage>) {
        const { startDate, endDate } = action.payload;
        state.dateRange = {
          startDate: startDate ? moment(startDate) : null,
          endDate: endDate ? moment(endDate) : null,
        };
      },
      
      setGuests(state, action: PayloadAction<BookingState['guests']>) {
        state.guests = action.payload;
      },
    },
  });

  // Export the BookingState interface
export type { BookingState };
//   Export the slice and its actions:

  export const { setLocation, setDateRange, setGuests } = bookingSlice.actions;
export default bookingSlice.reducer;