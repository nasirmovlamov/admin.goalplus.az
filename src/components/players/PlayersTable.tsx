import { playersApi } from "@/store/playersApi";
import router, { useRouter } from "next/router";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";
import { DeletePlayerSureModal } from "./DeletePlayerSureModal";
import { title } from "process";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";

export const PlayersTable = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [playerId, setPlayerId] = useState();
  const router = useRouter();
  const [
    getPlayers,
    {
      data: playersData,
      isLoading: isPlayersLoading,
      error: playersError,
      isSuccess: isPlayersSuccess,
    },
  ] = playersApi.useLazyGetPlayersQuery();
  const [
    confirmPlayerApi,
    {
      data: confirmPlayerData,
      isLoading: isConfirmPlayerLoading,
      error: confirmPlayerError,
      isSuccess: isConfirmPlayerSuccess,
    },
  ] = playersApi.useConfirmPlayerApiMutation();
  const [
    getPlayersHeaders,
    {
      data: playersHeadersData,
      isLoading: isPlayersHeadersLoading,
      error: playersHeadersError,
      isSuccess: isPlayersHeadersSuccess,
      status: playersHeadersStatus,
    },
  ] = playersApi.useLazyGetPlayersHeadersQuery();

  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    TotalPages: 10,
    TotalCount: 0,
  });

  const columns = [
    {
      key: "imageUrl",
      dataIndex: "imageUrl",
      title: "Image",
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
      render: (imageUrl: string) =>
        imageUrl ? (
          <a href={imageUrl} target="_blank">
            <img
              src={imageUrl}
              alt="category"
              className="w-10 h-10 rounded-full"
            />
          </a>
        ) : (
          <img
            src="https://via.placeholder.com/150"
            alt="category"
            className="w-10 h-10 rounded-full"
          />
        ),
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
      key: "paid",
      dataIndex: "paid",
      title: "Is Paid",
      render: (paid: boolean) =>
        paid ? (
          <span className="text-green-500">Yes</span>
        ) : (
          <span className="text-red-500">No</span>
        ),
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "jerseyNumber",
      dataIndex: "jerseyNumber",
      title: "Jersey Number",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "position",
      dataIndex: "position",
      title: "Position",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "playerDetails",
      dataIndex: "playerDetails",
      title: "Quote",
      render: (playerDetails: any) => playerDetails?.quote,
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "playerDetails",
      dataIndex: "playerDetails",
      title: "Current SO",
      render: (playerDetails: any) => playerDetails?.currentSchool,
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "playerDetails",
      dataIndex: "playerDetails",
      title: "IDCARD",
      render: (playerDetails: any) => (
        <a
          className="text-blue-500 underline"
          href={playerDetails?.identificationUrl}
          target="_blank"
        >
          {" "}
          link to view{" "}
        </a>
      ),
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "playerDetails",
      dataIndex: "playerDetails",
      title: "SO Certificate",
      render: (playerDetails: any) => (
        <a
          className="text-blue-500 underline"
          href={playerDetails?.schoolCertificateUrl}
          target="_blank"
        >
          {" "}
          {playerDetails?.schoolCertificateUrl && "link to view"}{" "}
        </a>
      ),
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "isCaptain",
      dataIndex: "isCaptain",
      title: "Is Captain",
      render: (isCaptain: boolean) =>
        isCaptain ? (
          <span className="text-green-500">Yes</span>
        ) : (
          <span className="text-red-500">No</span>
        ),
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      className: "text-white bg-gray-600 p-2 border-b-2",
      render: (data: any) => (
        <div className="flex gap-2">
          <div
            onClick={() => {
              console.log(data);
            }}
            className="flex justify-center items-center gap-2 bg-gray-500 text-white font-bold px-4 py-1 rounded"
          >
            Confirm Player
            <input
              checked={data.activate}
              onChange={(e) => {
                if (e.target.checked) {
                  confirmPlayerApi({
                    playerId: data.id,
                    putData: { activate: true, paid: data.paid },
                  });
                } else {
                  confirmPlayerApi({
                    playerId: data.id,
                    putData: { activate: false, paid: data.paid },
                  });
                }
              }}
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-success checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-success checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-success checked:focus:bg-success checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-success dark:checked:after:bg-success dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
          <div
            onClick={() => {
              console.log(data);
            }}
            className="flex justify-center items-center gap-2 bg-gray-500 text-white font-bold px-4 py-1 rounded"
          >
            User has paid
            <input
              checked={data.paid}
              onChange={(e) => {
                if (e.target.checked) {
                  confirmPlayerApi({
                    playerId: data.id,
                    putData: { paid: true, activate: data.activate },
                  });
                } else {
                  confirmPlayerApi({
                    playerId: data.id,
                    putData: { paid: false, activate: data.activate },
                  });
                }
              }}
              className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-success checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-success checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-success checked:focus:bg-success checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-success dark:checked:after:bg-success dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
          <button
            onClick={() => {
              setDeleteModalOpen(true);
              setPlayerId(data.id);
            }}
            className="bg-red-500 p-2 rounded-md"
          >
            Delete User
          </button>
        </div>
      ),
    },
  ];

  const data = [
    { id: "01", name: "Jack" },
    { id: "02", name: "Rose" },
  ];

  useEffect(() => {
    const params = router.query;
    if (router.isReady) {
      getPlayersHeaders();
      getPlayers({
        PageNumber: 1,
        PageSize: 50,
        teamId: params.id as any,
      });
    }
  }, [router]);

  useEffect(() => {
    console.log(isPlayersHeadersSuccess);
    if (isPlayersHeadersSuccess) {
      getPlayers({
        PageNumber: playersHeadersData.pagination.CurrentPage,
        PageSize: pageSize,
        teamId: router.query.id as any,
      });
      setPagination(playersHeadersData.pagination);
    }
  }, [isPlayersHeadersSuccess]);

  useEffect(() => {
    console.log(playersData?.pagination);
    if (isPlayersSuccess) {
      setPagination(playersData.pagination);
    }
  }, [isPlayersSuccess]);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  const handlePage = (pageNumber: number) => {
    setPagination({ ...pagination, CurrentPage: pageNumber });
    getPlayers({
      PageNumber: pageNumber,
      PageSize: pageSize,
      teamId: router.query.id as any,
    });
  };

  const exportPlayers = async () => {
    try {
      const response = await axios.get(
        "https://api.goalplus.az/api/players/export",
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
      link.download = "players.csv";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isPlayersLoading ? (
        <div>Players table is loading...</div>
      ) : playersError ? (
        <div>Something went wrong while fetching players</div>
      ) : (
        <Table
          columns={columns}
          data={playersData?.data}
          rowKey="id"
          className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
        />
      )}

      <DeletePlayerSureModal
        playerId={playerId}
        modal={isDeleteModalOpen}
        setModal={setDeleteModalOpen}
      />

      <div className="flex justify-center gap-4 mt-2 items-center">
        <select
          name="select page pagination"
          id=""
          value={pageSize}
          onChange={(e: any) => {
            setPageSize(e.target.value);
            getPlayers({
              PageNumber: 1,
              PageSize: e.target.value,
              teamId: router.query.id as any,
            });
          }}
          className="bg-gray-800 text-white px-2 rounded-md h-[34px]"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="45">45</option>
        </select>
        <ResponsivePagination
          current={playersData?.pagination?.CurrentPage}
          total={playersData?.pagination?.TotalPages}
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
          onClick={exportPlayers}
        >
          Export all players
          <FontAwesomeIcon icon={faFileExport} className="ml-2" />
        </button>
      </div>
    </>
  );
};
