import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { parseCookies } from "nookies";
import { BASE_URL_MAIN } from "../..";

export const historiesApiSlice = createApi({
  reducerPath: "historiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL_MAIN}/history`,
    prepareHeaders: (headers) => {
      const cookies = parseCookies();
      headers.set("Authorization", `Bearer ${cookies.nToken}`);
      return headers;
    },
  }),
  tagTypes: ["HISTORY"],

  endpoints: (builder) => ({
    getHistory: builder.query<GetHistory, void>({
      query: () => `/`,
      providesTags: ["HISTORY"],
    }),
    addHistory: builder.mutation<AddHistory, AddHistoryDto>({
      query: (data) => ({
        url: `/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["HISTORY"],
    }),
    removeHistory: builder.mutation<RemoveHistory, RemoveHistoryDto>({
      query: ({ historyItemID }) => ({
        url: `/${historyItemID}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetHistoryQuery,
  useAddHistoryMutation,
  useRemoveHistoryMutation,
} = historiesApiSlice;

export type GetHistory = {
  userID: number;
  totalCount: number;
  histories: HistoryItem[];
};

type AddHistory = HistoryItem & {
  user: {
    userID: number;
    username: string;
  };
};

type RemoveHistory = {
  userID: number;
  historyItemID: number;
  message: string;
};
type RemoveHistoryDto = {
  historyItemID: number;
};

export type HistoryItem = {
  historyItemID: number;
  firstСurrencyst: string;
  secondСurrencyst: string;
  firstValue: number;
  secondValue: number;
  historyCreationDate: string;
};

type AddHistoryDto = {
  firstСurrencyst: string;
  secondСurrencyst: string;
  firstValue: number;
  secondValue: number;
};
