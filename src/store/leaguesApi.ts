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
  tagTypes: ["leagues", "rules"],
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

    postLeague: builder.mutation<
      any,
      {
        sportId: string;
        postData: any;
      }
    >({
      query: (body) => ({
        url: `/leagues?sportId=${body.sportId}`,
        method: "POST",
        body: body.postData,
      }),
      invalidatesTags: (result, error, id) => [{ type: "leagues", id: "LIST" }],
    }),

    putLeague: builder.mutation<
      any,
      {
        leagueId: any;
        putData: any;
      }
    >({
      query: (body) => ({
        url: `/leagues/${body.leagueId}`,
        method: "PUT",
        body: body.putData,
      }),
      invalidatesTags: (result, error, id) => [{ type: "leagues", id: "LIST" }],
    }),

    getLeague: builder.query<
      any,
      {
        leagueId: any;
      }
    >({
      query: (body) => ({
        url: `/leagues/${body.leagueId}`,
        method: "GET",
      }),
    }),

    getRules: builder.query<
      any,
      {
        leagueId: any;
      }
    >({
      query: (body) => ({
        url: `/leagues/${body.leagueId}/files/rules`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "rules", id: "LIST" }],
    }),

    postRules: builder.mutation<
      any,
      {
        leagueId: any;
        postData: any;
      }
    >({
      query: (body) => ({
        url: `/leagues/${body.leagueId}/files/rules`,
        method: "POST",
        body: body.postData,
      }),
      invalidatesTags: (result, error, id) => [{ type: "rules", id: "LIST" }],
    }),

    deleteLeague: builder.mutation<
      any,
      {
        leagueId: number;
      }
    >({
      query: (body) => ({
        url: `/leagues/${body.leagueId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "leagues", id: "LIST" }],
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

    getLeaguesExport: builder.query<any, void>({
      query: () => ({
        url: `/leagues/export`,
        method: "GET",
      }),
      transformResponse(apiResponse, meta: any) {
        console.log("meta", meta);
        console.log("apiResponse", apiResponse);
        return {
          "Report-To": JSON.parse(meta.response.headers.get("Report-To")),
        };
      },
    }),
  }),
});
