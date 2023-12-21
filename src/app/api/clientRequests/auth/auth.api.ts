import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../user/user.api";

const BASE_URL = "http://localhost:3000/auth";

export const authApiSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    registration: builder.mutation<AuthRes, AuthDto>({
      query: (registrationData) => ({
        url: "/registration",
        method: "POST",
        body: registrationData,
      }),
    }),
    login: builder.mutation<AuthRes, AuthDto>({
      query: (loginData) => ({
        url: "/login",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation } = authApiSlice;

export type AuthRes = User & Token;

type AuthDto = {
  username: string;
  password: string;
};

type Token = {
  token: string;
};

type StandartError = {
  message: string[];
  error: string;
  statusCode: number;
};
