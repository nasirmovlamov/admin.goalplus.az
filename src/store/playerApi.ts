import { LoginDto, UserDto } from "@/context/AuthContext";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type AccpetInviteDto = {
  username: string;
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
  schoolCertificate: File[];
  schoolLogo: File[];
  personalPhoto: File[];
  quote: string;
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
  isPaying: "institution" | "personal";
};

// Define a service using a base URL and expected endpoints
export const playerApi = createApi({
  reducerPath: "playerApi",
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
  tagTypes: ["player"],
  endpoints: (builder) => ({
    acceptInvite: builder.mutation<
      any,
      {
        params: {
          token: string;
          email: string;
        };
        postData: {
          fatherName: string;
          userName: string;
          password: string;
          gender: string;
          dateOfBirth: string;
          userDetails: {
            learnedAboutPlatform: string;
          };
        };
      }
    >({
      query: ({ params, postData }) => ({
        url: `/invitations/accept?token=${params.token}&email=${params.email}`,
        method: "POST",
        body: postData,
      }),
    }),

    getPlayerInfo: builder.query<
      any,
      {
        playerId: any;
      }
    >({
      query: ({ playerId }) => ({
        url: `/players/${playerId}`,
        method: "GET",
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
  }),
});
