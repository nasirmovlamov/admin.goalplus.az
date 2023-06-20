import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const ticketsApi = createApi({
  reducerPath: "ticketApi",
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
  tagTypes: ["ticket", "ticket-types"],
  endpoints: (builder) => ({
    getTickets: builder.query<
      any,
      {
        PageNumber: any;
        PageSize: any;
        SearchTerm?: string;
        TicketTypeId?: any;
      }
    >({
      query: (body) => ({
        url: `/tickets`,
        method: "GET",
        params: body,
      }),
      transformResponse(apiResponse, meta: any) {
        return {
          data: apiResponse,
          pagination: JSON.parse(meta.response.headers.get("x-pagination")),
        };
      },
      providesTags: (result, error, id) => [{ type: "ticket", id: "LIST" }],
    }),

    getTicket: builder.query<
      any,
      {
        id: any;
      }
    >({
      query: (body) => ({
        url: `/tickets/${body.id}`,
        method: "GET",
      }),
    }),

    getHeaders: builder.query<
      any,
      {
        PageNumber?: any;
        PageSize?: any;
        SearchTerm?: string;
        TicketTypeId?: any;
      }
    >({
      query: (body) => ({
        url: `/tickets`,
        method: "HEAD",
        params: body,
      }),
      transformResponse(apiResponse, meta: any) {
        return {
          pagination: JSON.parse(meta.response.headers.get("x-pagination")),
        };
      },
    }),

    getTicketTypes: builder.query<
      any,
      {
        PageNumber: any;
        PageSize: any;
        SearchTerm?: string;
      }
    >({
      query: (body) => ({
        url: `/ticket-types`,
        method: "GET",
        params: body,
      }),
      providesTags: (result, error, id) => [
        { type: "ticket-types", id: "LIST" },
      ],
    }),

    getTicketType: builder.query<any, any>({
      query: (id) => ({
        url: `/ticket-types/${id}`,
        method: "GET",
      }),
    }),

    deleteTicket: builder.mutation<any, any>({
      query: (id) => ({
        url: `/tickets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ticket", id: "LIST" }],
    }),

    deleteTicketType: builder.mutation<any, any>({
      query: (id) => ({
        url: `/ticket-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ticket-types", id: "LIST" }],
    }),

    postTicketType: builder.mutation<any, any>({
      query: (body) => ({
        url: `/ticket-types`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: [{ type: "ticket-types", id: "LIST" }],
    }),

    putTicket: builder.mutation<
      any,
      {
        id: any;
        postData: any;
      }
    >({
      query: (body) => ({
        url: `/ticket-types/${body.id}`,
        method: "PUT",
        body: body.postData,
      }),
      invalidatesTags: [{ type: "ticket-types", id: "LIST" }],
    }),

    putTicketType: builder.mutation<
      any,
      {
        id: any;
        postData: any;
      }
    >({
      query: (body) => ({
        url: `/ticket-types/${body.id}`,
        method: "PUT",
        body: body.postData,
      }),
      invalidatesTags: [{ type: "ticket-types", id: "LIST" }],
    }),
  }),
});
