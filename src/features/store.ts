import { combineReducers } from '@reduxjs/toolkit';
import bookingReducer from '../features/bookingSlice';

const rootReducer = combineReducers({
  booking: bookingReducer,
});


export type RootState = ReturnType<typeof rootReducer>;