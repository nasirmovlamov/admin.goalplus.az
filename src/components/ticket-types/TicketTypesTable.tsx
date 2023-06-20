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
type Props = {};

const TicketTypesTable = (props: Props) => {
  const router = useRouter();
  const [SearchTerm, setSearchTerm] = useState("");
  const [ticketTypeId, setTicketTypeId] = useState("");
  const [editTicketTypeModal, setEditTicketTypeModal] = useState(false);
  const [deleteTicketTypeSureModal, setDeleteTicketTypeSureModal] =
    useState(false);
  const [
    getTicketsApi,
    {
      data: ticketsData,
      isLoading: isTicketsLoading,
      error: ticketsError,
      isSuccess: isTicketsSuccess,
    },
  ] = ticketsApi.useLazyGetTicketTypesQuery();

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
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
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
    if (router.isReady) {
      const id = router.query.id;
      getTicketsApi({
        PageNumber: 1,
        PageSize: 45,
        SearchTerm: SearchTerm,
      });
    }
  }, [router]);

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
        <div>
          <Table
            columns={columns}
            data={ticketsData}
            rowKey="id"
            className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
          />
        </div>
      )}
    </>
  );
};

export default TicketTypesTable;
