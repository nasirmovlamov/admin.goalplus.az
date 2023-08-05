import { ticketsApi } from "@/store/ticketApi";
import Link from "next/link";
import { useRouter } from "next/router";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import EditTicketTypeModal from "./EditTicketTypeModal";
import DeleteTicketTypeSureModal from "./DeleteTicketTypeSureModal";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import ResponsivePagination from "react-responsive-pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { title } from "process";

type Props = {};

const TicketTypesTable = (props: Props) => {
  const router = useRouter();
  const [SearchTerm, setSearchTerm] = useState("");
  const [ticketTypeId, setTicketTypeId] = useState("");
  const [editTicketTypeModal, setEditTicketTypeModal] = useState(false);
  const [deleteTicketTypeSureModal, setDeleteTicketTypeSureModal] =
    useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    TotalPages: 25,
    TotalCount: 0,
  });
  const [
    getTicketsApi,
    {
      data: ticketsData,
      isLoading: isTicketsLoading,
      error: ticketsError,
      isSuccess: isTicketTypesSuccess,
    },
  ] = ticketsApi.useLazyGetTicketTypesQuery();
  const [
    getTicketTypesHeaders,
    {
      data: ticketTypesHeadersData,
      isLoading: isTicketTypesHeadersLoading,
      error: ticketsTypesHeadersError,
      isSuccess: isTicketTypesHeadersSuccess,
      status: ticketTypesHeadersStatus,
    },
  ] = ticketsApi.useLazyGetTicketTypesHeadersQuery();

  const { formState, register, handleSubmit, setValue } = useForm();

  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "id",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "name",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "price",
      dataIndex: "price",
      title: "price",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "description",
      dataIndex: "description",
      title: "description",
      width: 100,
      // render with fixed scrolled height
      render: (text: string) => (
        <div className="overflow-y-scroll h-[100px] ">{text}</div>
      ),
      // scroll bar design
      className: "text-white bg-gray-800 border-r-2 border-b-2 p-3",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "ticketCategory",
      dataIndex: "ticketCategory",
      title: "ticketCategory",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "dateStart",
      dataIndex: "dateStart",
      title: "dateStart",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "date",
      dataIndex: "date",
      title: "date",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "dateEnd",
      dataIndex: "dateEnd",
      title: "dateEnd",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Operations",
      dataIndex: "",
      width: 100,
      className: "text-white bg-gray-600 p-2 border-b-2",
      render: (row: any) => (
        <div className="flex gap-4">
          <button
            onClick={() => {
              setTicketTypeId(row.id);
              setEditTicketTypeModal(true);
            }}
            className="bg-green-500 p-2 rounded-md cursor-pointer"
          >
            Edit
          </button>
          {/* <button
            onClick={() => {
              setTicketTypeId(row.id);
              setDeleteTicketTypeSureModal(true);
            }}
            className="bg-red-500 p-2 rounded-md cursor-pointer"
          >
            Delete
          </button> */}
          <div>
            <Toggle
              disabled={true}
              checked={row.active}
              onChange={(e) => console.log(row)}
            />
          </div>
        </div>
      ),
    },
  ];

  const handleSearch = () => {
    getTicketsApi({
      PageNumber: 1,
      PageSize: 45,
      SearchTerm: SearchTerm,
    });
  };

  useEffect(() => {
    if (isTicketTypesHeadersSuccess) {
      getTicketsApi({
        PageNumber: ticketTypesHeadersData.pagination.CurrentPage,
        PageSize: pageSize,
        SearchTerm: SearchTerm,
      });
      setPagination(ticketTypesHeadersData.pagination);
    }
  }, [isTicketTypesHeadersSuccess]);

  useEffect(() => {
    getTicketTypesHeaders({});
  }, []);

  const handlePage = (pageNumber: number) => {
    setPagination({ ...pagination, CurrentPage: pageNumber });
    getTicketsApi({
      PageNumber: pageNumber,
      PageSize: pageSize,
      SearchTerm: SearchTerm,
    });
  };

  const handleExportAllTickets = async () => {
    try {
      const response = await axios.get(
        "https://api.goalplus.az/api/ticket-types/export",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // create csv file from data
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      // download file
      document.body.appendChild(link);
      link.href = url;
      link.download = "ticket-types.csv";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {ticketTypeId && (
        <EditTicketTypeModal
          setTicketTypeId={setTicketTypeId}
          ticketTypeId={ticketTypeId}
          modal={editTicketTypeModal}
          setModal={setEditTicketTypeModal}
        />
      )}
      {ticketTypeId && (
        <DeleteTicketTypeSureModal
          ticketTypeId={ticketTypeId}
          modal={deleteTicketTypeSureModal}
          setModal={setDeleteTicketTypeSureModal}
        />
      )}

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
              getTicketsApi({
                PageNumber: 1,
                PageSize: 45,
                SearchTerm: "",
              });
            }}
            className="bg-gray-800 text-white px-2 rounded-md h-[34px]"
          >
            Clear Filter
          </button>
        </div>
      </form>
      {isTicketsLoading ? (
        <div>Ticket type table is loading...</div>
      ) : ticketsError ? (
        <div>Something went wrong while fetching ticket types</div>
      ) : (
        ""
      )}
      {isTicketTypesSuccess && isTicketTypesHeadersSuccess && (
        <div>
          <Table
            columns={columns}
            data={ticketsData.data}
            rowKey="id"
            className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
          />
          <div className="flex justify-center gap-4 mt-2 items-center">
            <select
              name="select page pagination"
              id=""
              value={pageSize}
              onChange={(e: any) => {
                setPageSize(e.target.value);
                getTicketsApi({
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
              maxWidth={500}
              current={ticketsData.pagination?.CurrentPage}
              total={ticketsData.pagination?.TotalPages}
              onPageChange={handlePage}
              className="flex justify-center items-center gap-2 mt-2 text-[15px]"
              pageItemClassName="flex items-center justify-center rounded-full w-[45px] h-[45px]  bg-black-ripon text-blue-500 p-2"
              activeItemClassName="bg-[#C4F000] text-black-ripon"
              navClassName="bg-black-ripon text-[#C4F000]"
            />
          </div>
          {/* <div className="w-full flex justify-end my-5">
            <button
              disabled={true}
              className={`bg-green-500 p-2 rounded-md cursor-pointer text-white flex items-center gap-2 `}
              onClick={handleExportAllTickets}
            >
              Export all ticket types
              <FontAwesomeIcon icon={faFileExport} className="ml-2" />
            </button>
          </div> */}
        </div>
      )}
    </>
  );
};

export default TicketTypesTable;
