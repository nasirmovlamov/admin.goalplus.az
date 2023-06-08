import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterDto } from "./authApi";

// Define a service using a base URL and expected endpoints
export const playersApi = createApi({
  reducerPath: "playersApi",
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
  tagTypes: ["players"],
  endpoints: (builder) => ({
    getPlayers: builder.query<
      any,
      {
        PageNumber: number;
        PageSize: number;
        teamId: number;
      }
    >({
      query: (body) => ({
        url: `/players/team/${body.teamId}`,
        method: "GET",
        params: body,
      }),
      providesTags: (result, error, id) => [{ type: "players", id: "LIST" }],
      transformResponse(apiResponse, meta: any) {
        return {
          data: apiResponse,
          pagination: JSON.parse(meta.response.headers.get("x-pagination")),
        };
      },
    }),

    getPlayer: builder.query<any, { playerId: number }>({
      query: (body) => ({
        url: `/players/${body.playerId}`,
        method: "GET",
      }),
    }),

    confirmPlayerApi: builder.mutation<
      any,
      {
        playerId: number;
        putData: {
          activate?: boolean;
          paid?: boolean;
        };
      }
    >({
      query: (body) => ({
        url: `/players/${body.playerId}/activation`,
        method: "PUT",
        body: body.putData,
      }),
      invalidatesTags: (result, error, id) => [{ type: "players", id: "LIST" }],
    }),

    getUserPlayerInfo: builder.query<
      any,
      {
        userId: number;
      }
    >({
      query: ({ userId }) => ({
        url: `/players/user/${userId}`,
        method: "GET",
      }),
    }),

    deletePlayer: builder.mutation<any, { playerId: number }>({
      query: (body) => ({
        url: `/players/${body.playerId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "players", id: "LIST" }],
    }),

    getPlayersHeaders: builder.query<any, void>({
      query: () => ({
        url: `/players`,
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
