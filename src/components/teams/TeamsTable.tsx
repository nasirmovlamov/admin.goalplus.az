import { teamsApi } from "@/store/teamsApi";
import { data } from "autoprefixer";
import Link from "next/link";
import router, { useRouter } from "next/router";
import Table from "rc-table";
import React, { use, useEffect, useState } from "react";
import { render } from "react-dom";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";

export const TeamsTable = () => {
  const router = useRouter();
  const [
    getTeams,
    {
      data: teamsData,
      isLoading: isTeamsLoading,
      error: teamsError,
      isSuccess: isTeamsSuccess,
    },
  ] = teamsApi.useLazyGetTeamsQuery();
  const [
    getTeamsHeaders,
    {
      data: teamsHeadersData,
      isLoading: isTeamsHeadersLoading,
      error: teamsHeadersError,
      isSuccess: isTeamsHeadersSuccess,
      status: teamsHeadersStatus,
    },
  ] = teamsApi.useLazyGetTeamsHeadersQuery();
  const [
    deleteTeamApi,
    {
      data: deleteTeamData,
      isLoading: isDeleteTeamLoading,
      error: deleteTeamError,
      isSuccess: isDeleteTeamSuccess,
      isError: isDeleteTeamError,
    },
  ] = teamsApi.useDeleteTeamMutation();
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
      key: "name",
      dataIndex: "name",
      title: "Team Name",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "slogan",
      dataIndex: "slogan",
      title: "Slogan",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "teamDetails",
      dataIndex: "teamDetails",
      title: "SO Name",
      render: (teamDetails: any) => teamDetails?.schoolOfficial?.firstName,
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "teamDetails",
      dataIndex: "teamDetails",
      title: "SO Surname",
      render: (teamDetails: any) => teamDetails?.schoolOfficial?.lastName,
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "teamDetails",
      dataIndex: "teamDetails",
      title: "SO Email",
      render: (teamDetails: any) => teamDetails?.schoolOfficial?.email,
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "teamDetails",
      dataIndex: "teamDetails",
      title: "SO Number",
      render: (teamDetails: any) => teamDetails?.schoolOfficial?.number,
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "teamDetails",
      dataIndex: "teamDetails",
      title: "SO Position",
      render: (teamDetails: any) => teamDetails?.schoolOfficial?.position,
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "teamDetails",
      dataIndex: "teamDetails",
      title: "SO Certificate",
      render: (teamDetails: any) => (
        <>
          {teamDetails?.schoolImage && (
            <a
              className="text-blue-500 underline"
              href={teamDetails?.schoolImage}
              target="_blank"
            >
              link to view{" "}
            </a>
          )}
        </>
      ),
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "teamDetails",
      dataIndex: "teamDetails",
      title: "Additional Comments",
      render: (teamDetails: any) => teamDetails?.additionalComments,
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "paymentType",
      dataIndex: "paymentType",
      title: "Payment Type",
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
      title: "Operations",
      dataIndex: "id",
      key: "id",
      width: 400,
      className: "text-white bg-gray-600 p-2 border-b-2",
      render: (id: any) => (
        <div className="flex gap-2 w-full justify-center">
          <Link href={`/teams/players/${id}`}>
            <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded">
              View Players
            </button>
          </Link>
          <Link href={`/payment/team/${id}`}>
            <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-1 rounded">
              View Payments
            </button>
          </Link>
          <button
            onClick={() => {
              deleteTeam(id);
            }}
            className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded"
          >
            Delete team
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const params = router.query;
    if (router.isReady) {
      getTeamsHeaders({
        leagueId: params.id,
      });
      getTeams({
        PageNumber: 1,
        PageSize: 50,
        leagueId: params.id as any,
      });
    }
  }, [router]);

  useEffect(() => {
    if (isTeamsHeadersSuccess) {
      const params = router.query;
      console.log(params);
      getTeams({
        PageNumber: 1,
        PageSize: 50,
        leagueId: params.id as any,
      });
      setPagination(teamsHeadersData.pagination);
    }
  }, [isTeamsHeadersSuccess]);

  useEffect(() => {
    if (isTeamsSuccess) {
      setPagination(teamsData.pagination);
    }
  }, [isTeamsSuccess]);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  const handlePage = (pageNumber: number) => {
    setPagination({ ...pagination, CurrentPage: pageNumber });
    getTeams({
      PageNumber: pageNumber,
      PageSize: pageSize,
      leagueId: router.query.id as any,
    });
  };

  const deleteTeam = async (id: any) => {
    try {
      await deleteTeamApi({
        teamId: id,
      });
    } catch (error) {}
  };

  return (
    <>
      {isTeamsLoading ? (
        <div>Teams table is loading...</div>
      ) : teamsError ? (
        <div>Something went wrong while fetching teams</div>
      ) : (
        <Table
          columns={columns}
          data={teamsData?.data}
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
            getTeams({
              PageNumber: 1,
              PageSize: e.target.value,
              leagueId: router.query.id as any,
            });
          }}
          className="bg-gray-800 text-white px-2 rounded-md h-[34px]"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="45">45</option>
        </select>
        <ResponsivePagination
          current={teamsData?.pagination?.CurrentPage}
          total={teamsData?.pagination?.TotalPages}
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
