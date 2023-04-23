import { LoginDto, UserDto } from "@/context/AuthContext";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterDto } from "./authApi";

// Define a service using a base URL and expected endpoints
export const teamApi = createApi({
  reducerPath: "teamApi",
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
  tagTypes: ["team"],
  endpoints: (builder) => ({
    getTeamInfo: builder.query<
      any,
      {
        teamId: any;
      }
    >({
      query: ({ teamId }) => ({
        url: `/teams/${teamId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: (result, error, id) => [{ type: "team", id: "LIST" }],
    }),

    playersUserInfo: builder.query<
      any,
      {
        userId: any;
      }
    >({
      query: ({ userId }) => ({
        url: `/players/user/${userId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "team", id: "LIST" }],
    }),

    getTeamPlayers: builder.query<
      any,
      {
        teamId: any;
      }
    >({
      query: ({ teamId }) => ({
        url: `/players/team/${teamId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "team", id: "LIST" }],
    }),

    postTeamInfo: builder.mutation<
      any,
      {
        leagueId: any;
        userId: any;
        body: {
          slogan: string;
          paymentType: string;
          teamDetails: {
            schoolOfficial?: {
              firstName: string;
              lastName: string;
              email: string;
              number: string;
            };
            additionalComments: string;
          };
        };
      }
    >({
      query: ({ body: body, leagueId }) => ({
        url: `/teams?leagueId=${leagueId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "team", id: "LIST" }],
    }),

    putTeamInfo: builder.mutation<
      any,
      {
        teamId: any;
        body: {
          slogan: string;
          paymentType: string;
          jerseyNumber: string;
          quote: string;
          name: string;
          teamDetails: {
            schoolOfficial?: {
              firstName: string;
              lastName: string;
              email: string;
              number: string;
            };
            additionalComments: string;
          };
        };
      }
    >({
      query: ({ body: body, teamId }) => ({
        url: `/teams/${teamId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "team", id: "LIST" }],
    }),

    invitations: builder.mutation<
      any,
      {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
      }
    >({
      query: (body) => ({
        url: `/invitations`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "team", id: "LIST" }],
    }),

    leagueInfo: builder.query<
      any,
      {
        leagueId: any;
      }
    >({
      query: ({ leagueId }): any => ({
        url: `/leagues/${leagueId}`,
        method: "GET",
      }),
    }),

    teamLogo: builder.mutation<
      any,
      {
        teamId: any;
        body: any;
      }
    >({
      query: ({ body: body, teamId: id }) => ({
        url: `/teams/${id}/image`,
        method: "POST",
        body,
      }),
    }),

    idCard: builder.mutation<
      any,
      {
        playerId: any;
        body: any;
      }
    >({
      query: ({ body: body, playerId: id }) => ({
        url: `/players/${id}/files/identification`,
        method: "POST",
        body,
      }),
    }),

    putPlayerInfo: builder.mutation<
      any,
      {
        playerId: any;
        body: any;
      }
    >({
      query: ({ playerId, body }) => ({
        url: `/players/${playerId}`,
        method: "PUT",
        body,
      }),
    }),

    schoolCertificate: builder.mutation<
      any,
      {
        userId: any;
        body: any;
      }
    >({
      query: ({ body: body, userId: id }) => ({
        url: `/players/${id}/files/school-certificate`,
        method: "POST",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        body,
      }),
    }),

    profilePhoto: builder.mutation<
      any,
      {
        userId: any;
        body: any;
      }
    >({
      query: ({ body: body, userId: id }) => ({
        url: `/users/${id}/profile-image`,
        method: "POST",
        body,
      }),
    }),

    schoolLogo: builder.mutation<
      any,
      {
        teamId: any;
        body: any;
      }
    >({
      query: ({ body: body, teamId: id }) => ({
        url: `/teams/${id}/image/school`,
        method: "POST",
        body,
      }),
    }),

    // jersey number, jersey size, position : POST /api/players
    teamMembers: builder.mutation<
      any,
      {
        userId: any;
        body: {
          jerseyNumber: string;
          // jerseySize: string;
          position: string;
          playerDetails: {
            quote: string;
          };
        };
      }
    >({
      query: ({ body: body, userId: id }) => ({
        url: `/players/user/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },

        body,
      }),
    }),
  }),
});
