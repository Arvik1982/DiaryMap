import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DATA_ENDPOINT } from "./endpoints";

export const footballTeamsApi = createApi({
  reducerPath: "footballTeamsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: DATA_ENDPOINT,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = "23ae40e1788e440692d924e6ff2fae3e";
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),

  endpoints: (builder) => ({
    getTeams: builder.query<string[], string>({
      query: (getPoint) => `/todos/${getPoint}`,
    }),
  }),
});
export const { useGetTeamsQuery } = footballTeamsApi;
