import { JwtDto, UserDto } from "@/context/AuthContext";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type PokemonType = {
  name: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type RegisterDto = {
  username: string;
  teamName: string;
  name: string;
  surname: string;
  fathername: string;
  email: string;
  password: string;
  gender: string;
  birthdate: string;
  idCard: File[];
  learnAboutUs: string;
  howLearnAboutUs: string;
  shirtSize: string;
  photo: string;
  jerseyNumber: string;
  playerPosition: string;
  approvesTermsAndConditions: string;
  areYourUniPayment: string;
  comments: string;
  sportType: string;
  // file
  schoolCertificate: File[];
  schoolLogo: File[];
  personalPhoto: File[];
  coach: {
    name: string;
    surname: string;
    email: string;
  };
  quote: string;
  teamLogo: File[];
  teamSlogan: string;
  schoolName: string;
  schoolOfficial: {
    name: string;
    surname: string;
    position: string;
    email: string;
    contactNumber: string;
  };
  comment: string;
  termsAndConditions: boolean;
  leagueType: string;
  isPaying: "institution" | "personal";
  institutionPaying?: {
    name: string;
    surname: string;
    position: string;
    email: string;
    contactNumber: string;
  };
  teamMembers: {
    name: string;
    surname: string;
    email: string;
    contactNumber: string;
  }[];
};

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.goalplus.az/api",
    // global error message toaster
    // ref: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#global-error-handling
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["me"],
  endpoints: (builder) => ({
    me: builder.query({
      query: () => {
        const userId = localStorage.getItem("userId");
        console.log(userId);
        return "/users/" + userId;
      },
      providesTags: (result) => [{ type: "me", id: "LIST" }],
    }),

    refreshToken: builder.mutation<
      JwtDto,
      {
        accessToken: string;
        refreshToken: string;
      }
    >({
      query: (body) => ({
        url: `/token/refresh`,
        method: "POST",
        body,
      }),
    }),

    requestPasswordReset: builder.mutation<
      any,
      {
        email: string;
      }
    >({
      query: (body) => ({
        url: `/authentication/password/reset-request`,
        method: "POST",
        body,
      }),
    }),

    forgetPassword: builder.mutation<
      any,
      {
        email: string;
        token: string;
        password: string;
        passwordConfirm: string;
      }
    >({
      query: (body) => ({
        url: `/authentication/password/reset`,
        method: "POST",
        body,
      }),
    }),

    //use params
    emailConfirmation: builder.mutation<
      any,
      {
        token: string;
        email: string;
      }
    >({
      query: (body) => ({
        url: `/authentication/email?token=${body.token}&email=${body.email}`,
        method: "GET",
      }),
    }),

    login: builder.mutation<JwtDto, LoginDto>({
      query: (body) => ({
        url: `/authentication/login`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "me", id: "LIST" }],
    }),

    register: builder.mutation<RegisterDto, RegisterDto>({
      query: (body) => ({
        url: ``,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "me", id: "LIST" }],
    }),

    authentication: builder.mutation<
      any,
      {
        // name, surname, fathername, email, gender, bday
        firstName: string;
        lastName: string;
        fatherName: string;
        password: string;
        email: string;
        gender: string;
        dateOfBirth: string;
        role: string;
        userName: string;
        // phoneNumber: string;
        // role: string;
        userDetails: {
          learnedAboutPlatform: string;
        };
      }
    >({
      query: (body) => ({
        url: `/authentication`,
        method: "POST",
        body,
      }),
    }),

    idCard: builder.mutation<
      any,
      {
        userId: any;
        body: any;
      }
    >({
      query: ({ body: body, userId: id }) => ({
        url: `/players/${id}/files/identification`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        body,
      }),
    }),

    teamInfo: builder.mutation<
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
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body,
      }),
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
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
        body,
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
        url: `/api/teams/${id}/image`,
        method: "POST",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
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

    getPlayerUser: builder.query<
      any,
      {
        userId: any;
      }
    >({
      query: ({ userId: id }) => ({
        url: `/players/user/${id}`,
        method: "GET",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    }),

    userProfileImage: builder.mutation<
      any,
      {
        userId: any;
        body: any;
      }
    >({
      query: ({ body: body, userId: id }) => ({
        url: `/api/users/${id}/profile-image`,
        method: "POST",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
        body,
      }),
    }),

    // jersey number, jersey size, position : POST /api/players
    players: builder.mutation<
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
