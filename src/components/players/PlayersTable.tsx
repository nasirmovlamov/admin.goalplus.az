import { playersApi } from "@/store/playersApi";
import router, { useRouter } from "next/router";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";
import { DeletePlayerSureModal } from "./DeletePlayerSureModal";

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
      render: (playerDetails: any) => playerDetails?.identificationUrl,
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "playerDetails",
      dataIndex: "playerDetails",
      title: "SO Certificate",
      render: (playerDetails: any) => playerDetails?.schoolCertificateUrl,
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
      dataIndex: "id",
      key: "operations",
      className: "text-white bg-gray-600 p-2 border-b-2",
      render: (id: any) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              console.log(id);
            }}
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded"
          >
            Confirm Player
          </button>
          <button
            onClick={() => {
              setDeleteModalOpen(true);
              setPlayerId(id);
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
    </>
  );
};
