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

export const PlayerTable = () => {
  const router = useRouter();
  const [
    getPlayer,
    {
      data: playersData,
      isLoading: isPlayersLoading,
      error: playersError,
      isSuccess: isPlayersSuccess,
    },
  ] = playersApi.useLazyGetPlayerQuery();

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
  ];

  const data = [
    { id: "01", name: "Jack" },
    { id: "02", name: "Rose" },
  ];

  useEffect(() => {
    const params = router.query;
    if (router.isReady) {
      getPlayer({
        playerId: params.id as any,
      });
    }
  }, [router]);

  return (
    <>
      {isPlayersLoading ? (
        <div>Players table is loading...</div>
      ) : playersError ? (
        <div>Something went wrong while fetching players</div>
      ) : (
        <Table
          columns={columns}
          data={[playersData]}
          rowKey="id"
          className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
        />
      )}
    </>
  );
};
