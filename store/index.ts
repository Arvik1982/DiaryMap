import eventSlice from "@/store/slices/eventsSlice";
import mapSlice from "@/store/slices/mapSlice";
import navigationSlice from "@/store/slices/navigationSlice";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slices/loginSlice";

import { useDispatch, useSelector, useStore } from "react-redux";
import { authorizationApi } from "./api/authorizationApi";
import { footballTeamsApi } from "./api/footballTeamsApi";

const store = configureStore({
  reducer: {
    login: loginReducer,
    navigationSlice: navigationSlice,
    eventSlice: eventSlice,
    mapSlice: mapSlice,
    [footballTeamsApi.reducerPath]: footballTeamsApi.reducer,
    [authorizationApi.reducerPath]: authorizationApi.reducer,
  },
  middleware: (g) =>
    g().concat(footballTeamsApi.middleware).concat(authorizationApi.middleware),
});

export default store;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
