import { usersApi } from "@/store/usersApi";
import { data } from "autoprefixer";
import Link from "next/link";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";
import { ShowUserPlayerInfoModalModal } from "./ShowUserPlayerInfoModal";
import axios from "axios";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { playersApi } from "@/store/playersApi";

export const UserTable = () => {
  const router = useRouter();

  const [
    getUser,
    {
      data: usersData,
      isLoading: isUsersLoading,
      error: usersError,
      isSuccess: isUsersSuccess,
    },
  ] = usersApi.useLazyGetUserQuery();

  const [
    getPlayer,
    {
      data: playersData,
      isLoading: isPlayersLoading,
      error: playersError,
      isSuccess: isPlayersSuccess,
    },
  ] = playersApi.useLazyGetUserPlayerInfoQuery();

  const playerColumns = [
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
      render: (playerDetails: any) =>
        playerDetails?.identificationUrl ? (
          <a
            className="text-blue-500 underline"
            href={playerDetails?.identificationUrl}
            target="_blank"
          >
            {" "}
            link to view{" "}
          </a>
        ) : (
          <></>
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
      key: "userName",
      dataIndex: "userName",
      title: "Username",
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
      key: "emailConfirmed",
      dataIndex: "emailConfirmed",
      title: "Email Confirmed",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
      render: (emailConfirmed: boolean) =>
        emailConfirmed ? (
          <div className="text-green-500">Yes</div>
        ) : (
          <div className="text-red-500">No</div>
        ),
    },
    // {
    //   key: "roles",
    //   dataIndex: "roles",
    //   title: "Roles",
    //   width: 100,
    //   className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
    //   rowClassName: "bg-black-ripon",
    //   render: (roles: any) => {
    //     return (
    //       <>
    //         {roles.map((role: any) =>
    //           role === "Captain" ? (
    //             <div key={role} className="text-red-500">
    //               Captain
    //             </div>
    //           ) : (
    //             role
    //           )
    //         )}
    //       </>
    //     );
    //   },
    // },
  ];

  useEffect(() => {
    if (router.isReady) {
      getUser({
        id: router.query.id as any,
      });
    }
  }, [router]);

  useEffect(() => {
    if (isUsersSuccess) {
      getPlayer({
        userId: router.query.id as any,
      });
    }
  }, [isUsersSuccess]);

  return (
    <>
      <p className="text-2xl font-semibold text-center text-white bg-gray-800 p-2 border-r-2 border-b-2">
        {" "}
        User Info Table
      </p>
      {isUsersLoading ? (
        <div>User table is loading...</div>
      ) : usersError ? (
        <div>Something went wrong while fetching user info</div>
      ) : (
        <Table
          columns={columns}
          data={[usersData]}
          rowKey="id"
          className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
        />
      )}
      <p className="text-2xl font-semibold text-center text-white bg-gray-800 p-2 border-r-2 border-b-2">
        {" "}
        Player Info Table
      </p>
      {isUsersLoading ? (
        <div>Player table is loading...</div>
      ) : usersError ? (
        <div>Something went wrong while fetching playerinfo</div>
      ) : (
        <Table
          columns={playerColumns}
          data={[playersData]}
          rowKey="id"
          className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
        />
      )}
    </>
  );
};
