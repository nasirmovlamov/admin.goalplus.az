import { ticketsApi } from "@/store/ticketApi";
import Link from "next/link";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";
import { ShowUserPlayerInfoModalModal } from "../users/ShowUserPlayerInfoModal";

export const TicketsTable = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [deleteTicketSureModal, setDeleteTicketSureModal] = useState(false);
  const [
    getUsers,
    {
      data: ticketsData,
      isLoading: isUsersLoading,
      error: ticketsError,
      isSuccess: isUsersSuccess,
    },
  ] = ticketsApi.useLazyGetTicketsQuery();
  const {
    data: ticketsHeadersData,
    isLoading: isUsersHeadersLoading,
    error: ticketsHeadersError,
    isSuccess: isUsersHeadersSuccess,
    status: ticketsHeadersStatus,
    refetch: ticketsHeadersRefetch,
  } = ticketsApi.useGetHeadersQuery();
  const { formState, register, handleSubmit, setValue } = useForm();
  const [pageSize, setPageSize] = useState(25);
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    TotalPages: 25,
    TotalCount: 0,
  });

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
      key: "phoneNumber",
      dataIndex: "phoneNumber",
      title: "Email",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "schoolName",
      dataIndex: "schoolName",
      title: "schoolName",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "dateOfBirth",
      dataIndex: "dateOfBirth",
      title: "dateOfBirth",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Operations",
      dataIndex: "id",
      key: "id",
      className: "text-white bg-gray-600 p-2 border-b-2",
      render: (id: any) => (
        <>
          <button
            onClick={() => {
              setTicketId(id);
              setDeleteTicketSureModal(true);
            }}
            className="bg-red-500 p-2 rounded-md cursor-pointer"
          >
            Delete
          </button>
          {/* <Link href={`/tickets/${id}/edit`}>View</Link>  */}
        </>
      ),
    },
  ];

  const data = [
    { id: "01", name: "Jack" },
    { id: "02", name: "Rose" },
  ];

  useEffect(() => {
    console.log(isUsersHeadersSuccess);
    if (isUsersHeadersSuccess) {
      getUsers({
        PageNumber: ticketsHeadersData.pagination.CurrentPage,
        PageSize: pageSize,
      });
      setPagination(ticketsHeadersData.pagination);
    }
  }, [isUsersHeadersSuccess]);

  useEffect(() => {
    if (isUsersSuccess) {
      setPagination(ticketsData.pagination);
    }
  }, [isUsersSuccess]);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  const handlePage = (pageNumber: number) => {
    setPagination({ ...pagination, CurrentPage: pageNumber });
    getUsers({
      PageNumber: pageNumber,
      PageSize: pageSize,
      SearchTerm: SearchTerm,
    });
  };

  const handleSearch = () => {
    getUsers({
      PageNumber: pagination.CurrentPage,
      PageSize: pageSize,
      SearchTerm: SearchTerm,
    });
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit(handleSearch)}>
        <div className="flex gap-2 my-2">
          <input
            {...register("SearchTerm")}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="enter search text"
            type="text"
            className="bg-gray-800 text-white px-2 rounded-md h-[34px] max-w-[500px] w-full"
          />
          <button className="bg-gray-800 text-white px-2 rounded-md h-[34px]">
            Search
          </button>

          <button
            type="button"
            onClick={() => {
              setValue("SearchTerm", "");
              setSearchTerm("");
              getUsers({
                PageNumber: pagination.CurrentPage,
                PageSize: pageSize,
              });
            }}
            className="bg-gray-800 text-white px-2 rounded-md h-[34px]"
          >
            Clear Filter
          </button>
        </div>
      </form>
      {isUsersLoading ? (
        <div>Users table is loading...</div>
      ) : ticketsError ? (
        <div>Something went wrong while fetching tickets</div>
      ) : (
        <Table
          columns={columns}
          data={ticketsData}
          rowKey="id"
          className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
        />
      )}

      <div className="flex justify-center gap-4 mt-2 items-center">
        <select
          name="select page pagination"
          id=""
          value={pageSize}
          onChange={(e: any) => {
            setPageSize(e.target.value);
            getUsers({
              PageNumber: 1,
              PageSize: e.target.value,
            });
          }}
          className="bg-gray-800 text-white px-2 rounded-md h-[34px]"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="45">45</option>
        </select>
        <ResponsivePagination
          current={ticketsData?.pagination?.CurrentPage}
          total={ticketsData?.pagination?.TotalPages}
          onPageChange={handlePage}
          className="flex justify-center items-center gap-2 mt-2 text-[15px]"
          pageItemClassName="flex items-center justify-center rounded-full w-[45px] h-[45px]  bg-black-ripon text-blue-500 p-2"
          activeItemClassName="bg-[#C4F000] text-black-ripon"
          navClassName="bg-black-ripon text-[#C4F000]"
        />
      </div>
    </>
  );
};
