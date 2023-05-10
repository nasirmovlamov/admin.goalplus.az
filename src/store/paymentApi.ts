import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.goalplus.az/api",
    // global error message toaster
    // ref: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#global-error-handling
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("accessToken")}`
        );
      }
      return headers;
    },
  }),
  tagTypes: ["payment"],
  endpoints: (builder) => ({
    getPayments: builder.query<
      any,
      {
        PageNumber?: number;
        PageSize?: number;
        orderBy?: any;
        Fields?: any;
      }
    >({
      query: (body) => ({
        url: `/payments`,
        method: "GET",
        params: body,
      }),
    }),

    getTeamPayments: builder.query<
      any,
      {
        teamId: number;
        PageNumber?: number;
        PageSize?: number;
        orderBy?: any;
        Fields?: any;
      }
    >({
      query: (body) => ({
        url: `/payments/team/${body.teamId}`,
        method: "GET",
        params: body,
      }),
    }),

    getPaymentsHeaders: builder.query<any, void>({
      query: () => ({
        url: `/payments`,
        method: "HEAD",
      }),
      transformResponse(apiResponse, meta: any) {
        return {
          pagination: JSON.parse(meta.response.headers.get("x-pagination")),
        };
      },
    }),
  }),
});
