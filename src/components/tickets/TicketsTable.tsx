import { ticketsApi } from "@/store/ticketApi";
import Link from "next/link";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";
import { ShowUserPlayerInfoModalModal } from "../users/ShowUserPlayerInfoModal";
import DeleteTicketSureModal from "./DeleteTicketSureModal";
import Toggle from "react-toggle";
import { format, parseISO } from "date-fns";
import AttendanceChart from "./TicketsChart";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { AsyncPaginate } from "react-select-async-paginate";

export const TicketsTable = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [SelectSearchTerm, setSelectSearchTerm] = useState<any>([]);
  const [ticketId, setTicketId] = useState("");
  const [deleteTicketSureModal, setDeleteTicketSureModal] = useState(false);
  const [ticketTypeId, setTicketTypeId] = useState(null);
  const [attendancePeriodIndex, setAttendancePeriodIndex] = useState(null);
  const [
    getTickets,
    {
      data: ticketsData,
      isLoading: isTicketsLoading,
      error: ticketsError,
      isSuccess: isTicketsSuccess,
    },
  ] = ticketsApi.useLazyGetTicketsQuery();
  const {
    data: ticketsTypeData,
    isLoading: isTicketsTypeLoading,
    error: ticketsTypeError,
    isSuccess: isTicketsTypeSuccess,
  } = ticketsApi.useGetTicketTypesQuery({
    PageNumber: 1,
    PageSize: 100,
  });
  const [
    getTicketsHeaders,
    {
      data: ticketsHeadersData,
      isLoading: isTicketHeadersLoading,
      error: ticketsHeadersError,
      isSuccess: isTicketsHeadersSuccess,
      status: ticketsHeadersStatus,
    },
  ] = ticketsApi.useLazyGetHeadersQuery();

  const { formState, register, handleSubmit, setValue } = useForm();
  const [pageSize, setPageSize] = useState(25);
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    TotalPages: 0,
    TotalCount: 0,
  });

  const columns = [
    {
      key: "index",
      dataIndex: "index",
      title: "No",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
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
      key: "email",
      dataIndex: "email",
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
      title: "phoneNumber",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },

    {
      key: "dateOfBirth",
      dataIndex: "dateOfBirth",
      title: "dateOfBirth",
      width: 300,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
      render: (dateOfBirth: any) => {
        return <div>{new Date(dateOfBirth).toLocaleDateString()}</div>;
      },
    },
    {
      key: "creationDate",
      dataIndex: "creationDate",
      title: "creationDate",
      width: 300,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
      render: (creationDate: any) => {
        return (
          <>
            <div>{format(parseISO(creationDate), "MMMM d, yyyy HH:mm:ss")}</div>
          </>
        );
      },
    },

    // {
    //   title: "Operations",
    //   dataIndex: "id",
    //   key: "id",
    //   className: "text-white bg-gray-600 p-2 border-b-2",
    //   render: (id: any) => (
    //     <>
    //       {/* <button
    //         onClick={() => {
    //           setTicketId(id);
    //           setDeleteTicketSureModal(true);
    //         }}
    //         className="bg-red-500 p-2 rounded-md cursor-pointer"
    //       >
    //         Delete
    //       </button> */}
    //       {/* <Link href={`/tickets/${id}/edit`}>View</Link>  */}
    //     </>
    //   ),
    // },
  ];

  useEffect(() => {
    if (isTicketsHeadersSuccess) {
      getTickets({
        PageNumber: ticketsHeadersData.pagination.CurrentPage,
        PageSize: pageSize,
      });
      setPagination(ticketsHeadersData.pagination);
    }
  }, [isTicketsHeadersSuccess]);

  useEffect(() => {
    if (isTicketsTypeSuccess) {
      if (ticketTypeId) {
        let ticketPayload: {
          PageNumber: number;
          PageSize: number;
          TicketTypeId?: string;
          AttendancePeriod?: string;
        } = {
          PageNumber: 1,
          PageSize: pageSize,
        };
        ticketPayload.PageNumber = 1;
        ticketPayload.PageSize = pageSize;
        if (ticketTypeId !== "all") {
          ticketPayload.TicketTypeId = ticketTypeId;
          if (attendancePeriodIndex) {
            ticketPayload.AttendancePeriod = attendancePeriodIndex;
          }
        }
        getTickets(ticketPayload);
        setPagination(ticketsHeadersData.pagination);
      } else {
        getTickets({
          PageNumber: 1,
          PageSize: pageSize,
        });
        setPagination(ticketsHeadersData?.pagination);
      }
    }
  }, [isTicketsTypeSuccess, ticketTypeId, attendancePeriodIndex]);

  useEffect(() => {
    getTicketsHeaders({});
  }, []);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  const handlePage = (pageNumber: number) => {
    setPagination({ ...pagination, CurrentPage: pageNumber });
    getTickets({
      PageNumber: pageNumber,
      PageSize: pageSize,
      SearchTerm: SearchTerm,
    });
  };

  const handleSearch = () => {
    getTickets({
      PageNumber: pagination.CurrentPage,
      PageSize: pageSize,
      SearchTerm: SearchTerm,
    });
  };

  const handleExportAllTickets = async () => {
    try {
      const response = await axios.get(
        "https://api.goalplus.az/api/tickets/export",
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
      link.download = "tickets.csv";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  async function loadOptions(search: any, loadedOptions: any, { page }: any) {
    const response = await fetch(
      `https://api.goalplus.az/api/ticket-types?PageNumber=${page}&PageSize=45&SearchTerm=${search}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const responseJSON = await response.json();
    // read headers of X-Pagination
    const pagination = JSON.parse(response.headers.get("X-Pagination") || "{}");
    // return formatted data
    console.log(pagination);
    const options = responseJSON.map((i: any) => ({
      value: i.id,
      label: i.name,
    }));
    return {
      options: options,
      hasMore: pagination.HasNext,
      additional: {
        page: page + 1,
      },
    };
  }

  const hanlePaginatedSelectChange = (item: {
    label: string;
    value: string;
  }) => {
    getTicketsHeaders({
      TicketTypeId: item.value,
    });
    setAttendancePeriodIndex(null);
    setTicketTypeId(item.value as any);
    setSelectSearchTerm(item);
  };

  if (isTicketsHeadersSuccess && isTicketsSuccess)
    return (
      <>
        {/* <AttendanceChart data={ticketsData.data} /> */}

        <DeleteTicketSureModal
          setTicketId={setTicketId}
          ticketId={ticketId}
          modal={deleteTicketSureModal}
          setModal={setDeleteTicketSureModal}
        />
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
                getTickets({
                  PageNumber: pagination.CurrentPage,
                  PageSize: pageSize,
                });
                setSelectSearchTerm(null);
                setTicketTypeId(null);
              }}
              className="bg-gray-800 text-white px-2 rounded-md h-[34px]"
            >
              Clear Filter
            </button>
          </div>
        </form>
        {isTicketsHeadersSuccess && (
          <Table
            columns={[
              {
                key: "TicketType",
                dataIndex: "TicketType",
                title: "TicketType",
                width: 350,
                className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
                render: () => (
                  <div>
                    <AsyncPaginate
                      // options color
                      className="text-black w-[300px]"
                      value={SelectSearchTerm}
                      loadOptions={loadOptions}
                      onChange={hanlePaginatedSelectChange}
                      additional={{
                        page: 1,
                      }}
                    />
                    {/* <select
                      name=""
                      id=""
                      className="text-black w-[300px]"
                      onChange={(e) => {
                        if (e.target.value === "all") {
                          getTicketsHeaders({});
                          setTicketTypeId(null);
                          setAttendancePeriodIndex(null);
                          return;
                        }
                        getTicketsHeaders({
                          TicketTypeId: e.target.value,
                        });
                        setAttendancePeriodIndex(null);
                        setTicketTypeId(e.target.value as any);
                      }}
                    >
                      <option value="all">All</option>

                      {ticketsTypeData.data.map(
                        (ticketType: any, index: number) => (
                          <option key={index} value={ticketType.id}>
                            {ticketType.name}
                          </option>
                        )
                      )}
                    </select> */}
                  </div>
                ),
              },
              {
                key: "TicketType",
                dataIndex: "TicketType",
                title: "TicketType",
                width: 350,
                className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
                render: () => (
                  <div>
                    <select
                      name=""
                      id=""
                      className="text-black w-[300px]"
                      onChange={(e) => {
                        getTicketsHeaders({
                          TicketTypeId: ticketTypeId as unknown as string,
                          AttendancePeriod: e.target.value,
                        });
                        setAttendancePeriodIndex(e.target.value as any);
                      }}
                    >
                      {ticketsTypeData.data
                        ?.filter(
                          (ticketType: any) => ticketType.id == ticketTypeId
                        )[0]
                        ?.dates?.map((date: any, index: number) => (
                          <option key={index} value={index}>
                            {format(new Date(date.startTime), "MMMM d")}
                          </option>
                        ))}
                    </select>
                  </div>
                ),
              },
              {
                key: "TotalCount",
                dataIndex: "TotalCount",
                title: "Total ticket count",
                width: 250,
                className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
              },
            ]}
            data={[ticketsHeadersData.pagination]}
            className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
          />
        )}
        {isTicketsLoading ? (
          <div>Users table is loading...</div>
        ) : ticketsError ? (
          <div>Something went wrong while fetching tickets</div>
        ) : (
          <Table
            columns={columns}
            data={ticketsData.data.map((ticket: any, index: number) => ({
              ...ticket,
              index: (index + 1) * ticketsData.pagination.CurrentPage,
            }))}
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
              getTickets({
                PageNumber: 1,
                PageSize: e.target.value,
                TicketTypeId: ticketTypeId as unknown as string,
                AttendancePeriod: attendancePeriodIndex as unknown as string,
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
        <div className="w-full flex justify-end my-5">
          <button
            className="bg-green-500 p-2 rounded-md cursor-pointer text-white"
            onClick={handleExportAllTickets}
          >
            Export all tickets
            <FontAwesomeIcon icon={faFileExport} className="ml-2" />
          </button>
        </div>
      </>
    );

  return null;
};
