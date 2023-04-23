import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterDto } from "./authApi";

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.goalplus.az/api",
    // global error message toaster
    // ref: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#global-error-handling
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    getUsers: builder.query<any, any>({
      query: () => ({
        url: `/users?PageNumber=1&PageSize=10000`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "users", id: "LIST" }],
    }),
  }),
});
