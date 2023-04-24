import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const teamsApi = createApi({
  reducerPath: "teamsApi",
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
  tagTypes: ["teams"],
  endpoints: (builder) => ({
    getTeams: builder.query<
      any,
      {
        PageNumber: number;
        PageSize: number;
        leagueId: number;
      }
    >({
      query: (body) => ({
        url: `/teams/league/${body.leagueId}`,
        method: "GET",
        params: body,
      }),
      providesTags: (result, error, id) => [{ type: "teams", id: "LIST" }],
      transformResponse(apiResponse, meta: any) {
        return {
          data: apiResponse,
          pagination: JSON.parse(meta.response.headers.get("x-pagination")),
        };
      },
    }),

    getTeamsHeaders: builder.query<any, any>({
      query: (body) => ({
        url: `/teams`,
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
