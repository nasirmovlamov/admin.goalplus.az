import Layout from "@/components/layout/Layout";
import { ticketsApi } from "@/store/ticketApi";
import Link from "next/link";
import { useRouter } from "next/router";
import Table from "rc-table";
import react from "react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";

export default function TicketPage() {
  const router = useRouter();
  const [
    getTicket,
    {
      data: ticketsData,
      isLoading: isTicketLoading,
      error: ticketsError,
      isSuccess: isTicketSuccess,
    },
  ] = ticketsApi.useLazyGetTicketQuery();
  const [
    getTicketType,
    {
      data: ticketsTypeData,
      isLoading: isTicketTypeLoading,
      error: ticketsTypeError,
      isSuccess: isTicketTypeSuccess,
    },
  ] = ticketsApi.useLazyGetTicketTypeQuery();

  const columns = [
    {
      key: "firstName",
      dataIndex: "firstName",
      title: "First Name",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "lastName",
      dataIndex: "lastName",
      title: "Last Name",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "gender",
      dataIndex: "gender",
      title: "Gender",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },

    {
      key: "email",
      dataIndex: "email",
      title: "Email",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      title: "phoneNumber",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "hasWolt",
      dataIndex: "hasWolt",
      title: "hasWolt",
      render: (hasWolt: any) => {
        return <span>{hasWolt ? "Yes" : "No"}</span>;
      },
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "dateOfBirth",
      dataIndex: "dateOfBirth",
      title: "dateOfBirth",
      render: (date: any) => {
        return <span>{new Date(date).toDateString()}</span>;
      },
      width: 150,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
  ];

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      getTicket({
        id: `${id}`,
      });
    }
  }, [router]);

  useEffect(() => {
    if (isTicketSuccess) {
      console.log("ticket", ticketsData.id);
      getTicketType(ticketsData.ticketTypeId);
    }
  }, [isTicketSuccess]);

  useEffect(() => {
    if (isTicketTypeSuccess) {
      console.log("ticketType", ticketsTypeData);
    }
  }, [isTicketTypeSuccess]);

  return (
    <Layout title="Tickets">
      {isTicketSuccess && ticketsData.checked > 1 && (
        <p className="text-2xl font-semibold text-center text-white bg-red-800 p-10 border-r-2 border-b-2">
          {" "}
          THIS TICKET HAS BEEN SCANNED ALREADY
        </p>
      )}
      {isTicketSuccess && ticketsData.checked < 2 && (
        <>
          <p className="text-2xl font-semibold text-center text-white bg-gray-800 p-2 border-r-2 border-b-2">
            {" "}
            Ticket Info
          </p>
          {isTicketTypeLoading ? (
            <div>Ticket date info is loading...</div>
          ) : ticketsTypeError ? (
            <div>Something went wrong while fetching ticket info</div>
          ) : null}

          {isTicketTypeSuccess && isTicketSuccess && (
            <Table
              columns={[
                {
                  key: "name",
                  dataIndex: "name",
                  title: "Ticket Type",
                  width: 150,
                  className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
                },
                {
                  key: "id",
                  dataIndex: "id",
                  title: "Ticket id",
                  width: 150,
                  className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
                },
                {
                  key: "price",
                  dataIndex: "price",
                  title: "price",
                  width: 150,
                  className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
                },
                {
                  key: "dates",
                  dataIndex: "dates",
                  title: "dates",
                  width: 150,
                  className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
                  render: (dates: any) => {
                    console.log("dates", dates[0].startTime);
                    return (
                      <span>
                        {dates[ticketsData.attendancePeriod].startTime}
                      </span>
                    );
                  },
                },
              ]}
              data={[ticketsTypeData]}
              className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
            />
          )}

          <p className="text-2xl font-semibold text-center text-white bg-gray-800 p-2 border-r-2 border-b-2">
            {" "}
            Visitor Info
          </p>
          {isTicketLoading ? (
            <div>Visitor Info is loading...</div>
          ) : ticketsError ? (
            <div>Something went wrong while fetching visitor info</div>
          ) : (
            <Table
              columns={columns}
              data={[ticketsData]}
              className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
            />
          )}
        </>
      )}
    </Layout>
  );
}
