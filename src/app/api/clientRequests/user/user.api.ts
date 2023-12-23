import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { parseCookies } from "nookies";
import { BASE_URL_MAIN } from "../..";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_MAIN}/user`,
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      headers.set("Authorization", `Bearer ${cookies.nToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => `/me`,
    }),
  }),
});

export const { useGetMeQuery } = userApiSlice;

export type User = {
  userID: number;
  username: string;
  userRegistrationDate: string;
};
