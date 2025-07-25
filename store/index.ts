import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";
import navigationSlice from "@/store/slices/navigationSlice";
import eventSlice from "@/store/slices/eventsSlice";
import mapSlice from "@/store/slices/mapSlice";

import { useDispatch, useSelector, useStore } from "react-redux";

const store = configureStore({
  reducer: {
    login: loginReducer,
    navigationSlice: navigationSlice,
    eventSlice: eventSlice,
    mapSlice:mapSlice,
  },
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
