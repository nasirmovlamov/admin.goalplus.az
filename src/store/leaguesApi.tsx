import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const leaguesApi = createApi({
  reducerPath: "leaguesApi",
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
  tagTypes: ["leagues"],
  endpoints: (builder) => ({
    getLeagues: builder.query<
      any,
      {
        PageNumber: number;
        PageSize: number;
        sportId: number;
      }
    >({
      query: (body) => ({
        url: `/leagues/sport/${body.sportId}`,
        method: "GET",
        params: body,
      }),
      providesTags: (result, error, id) => [{ type: "leagues", id: "LIST" }],
      transformResponse(apiResponse, meta: any) {
        return {
          data: apiResponse,
          pagination: JSON.parse(meta.response.headers.get("x-pagination")),
        };
      },
    }),

    getLeaguesHeaders: builder.query<any, any>({
      query: (body) => ({
        url: `/leagues`,
        method: "HEAD",
        params: body,
      }),
      transformResponse(apiResponse, meta: any) {
        return {
          pagination: JSON.parse(meta.response.headers.get("x-pagination")),
        };
      },
    }),
  }),
});
