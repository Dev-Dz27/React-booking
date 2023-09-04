import { combineReducers } from '@reduxjs/toolkit';
import bookingReducer from '../features/bookingSlice';
import selectedBookingReducer from '../features/selectedBookingSlice';

const rootReducer = combineReducers({
  booking: bookingReducer,
  selectedBooking: selectedBookingReducer,
});


export type RootState = ReturnType<typeof rootReducer>;