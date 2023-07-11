import React from "react";
import MyRouter from "routers/index";
import { Provider } from "react-redux";
import bookingReducer from "features/bookingSlice";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  // to fix the problem from redux-persist. redux-toolkit
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

function App() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <Provider store={store}>
        <MyRouter />
      </Provider>
    </div>
  );
}

export default App;