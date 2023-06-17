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
    getUser,
    {
      data: ticketsData,
      isLoading: isUsersLoading,
      error: ticketsError,
      isSuccess: isUsersSuccess,
    },
  ] = ticketsApi.useLazyGetTicketQuery();

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
      console.log("id", id);
      getUser({
        id: `${id}`,
      });
    }
  }, [router]);

  return (
    <Layout title="Tickets">
      <>
        {isUsersLoading ? (
          <div>Users table is loading...</div>
        ) : ticketsError ? (
          <div>Something went wrong while fetching tickets</div>
        ) : (
          <Table
            columns={columns}
            data={[ticketsData]}
            className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
          />
        )}
      </>
    </Layout>
  );
}
