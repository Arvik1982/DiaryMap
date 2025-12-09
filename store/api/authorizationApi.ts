import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_ENDPOINT } from "./endpoints";

export const authorizationApi = createApi({
  reducerPath: "authorizationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_ENDPOINT,
    prepareHeaders: (headers) => {
      headers.set("x-api-key", "reqres-free-v1");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postAuthorizationData: builder.mutation({
      query: (data: { username: string; email: string; password: string }) => {
        return {
          url: "login",
          method: "POST",
          body: data,
        };
      },
      transformResponse: (resp) => {
        console.log(resp);
        return resp;
      },
    }),
  }),
});
export const { usePostAuthorizationDataMutation } = authorizationApi;
