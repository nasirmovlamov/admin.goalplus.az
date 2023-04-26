import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const sportsApi = createApi({
  reducerPath: "sportsApi",
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
  tagTypes: ["sports"],
  endpoints: (builder) => ({
    getSports: builder.query<
      any,
      {
        PageNumber: number;
        PageSize: number;
      }
    >({
      query: (body) => ({
        url: `/sports`,
        method: "GET",
        params: body,
      }),
      providesTags: (result, error, id) => [{ type: "sports", id: "LIST" }],
      transformResponse(apiResponse, meta: any) {
        return {
          data: apiResponse,
          pagination: JSON.parse(meta.response.headers.get("x-pagination")),
        };
      },
    }),

    getSport: builder.query<any, any>({
      query: (body) => ({
        url: `/sports/${body.sportId}`,
        method: "GET",
      }),
    }),

    postSport: builder.mutation<any, any>({
      query: (body) => ({
        url: `/sports`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "sports", id: "LIST" }],
    }),

    putSport: builder.mutation<
      any,
      {
        sportId: any;
        putData: any;
      }
    >({
      query: (body) => ({
        url: `/sports/${body.sportId}`,
        method: "PUT",
        body: body.putData,
      }),
      invalidatesTags: [{ type: "sports", id: "LIST" }],
    }),

    deleteSport: builder.mutation<
      any,
      {
        sportId: any;
      }
    >({
      query: (body) => ({
        url: `/sports/${body.sportId}`,
        method: "DELETE",
      }),
    }),

    getHeaders: builder.query<any, void>({
      query: () => ({
        url: `/sports`,
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
