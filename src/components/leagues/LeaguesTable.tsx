import { leaguesApi } from "@/store/leaguesApi";
import { data } from "autoprefixer";
import Link from "next/link";
import router, { useRouter } from "next/router";
import Table from "rc-table";
import React, { use, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";

export const LeaguesTable = () => {
  const router = useRouter();
  const [
    getLeagues,
    {
      data: leaguesData,
      isLoading: isLeaguesLoading,
      error: leaguesError,
      isSuccess: isLeaguesSuccess,
    },
  ] = leaguesApi.useLazyGetLeaguesQuery();
  const [
    getLeaguesHeaders,
    {
      data: leaguesHeadersData,
      isLoading: isLeaguesHeadersLoading,
      error: leaguesHeadersError,
      isSuccess: isLeaguesHeadersSuccess,
      status: leaguesHeadersStatus,
    },
  ] = leaguesApi.useLazyGetLeaguesHeadersQuery();

  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    TotalPages: 10,
    TotalCount: 0,
  });

  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "League Name",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Max number of players",
      width: 300,
      render: (leagueDetails: any) => <>{leagueDetails.maxNumberOfPlayers}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Min number of players",
      width: 300,
      render: (leagueDetails: any) => <>{leagueDetails.minNumberOfPlayers}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Price Early",
      width: 300,
      render: (leagueDetails: any) => <>{leagueDetails.priceEarly}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Price Regular",
      width: 300,
      render: (leagueDetails: any) => <>{leagueDetails.priceRegular}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Start Date",
      width: 300,
      render: (leagueDetails: any) => (
        <>{new Date(leagueDetails.startDate).toLocaleDateString()}</>
      ),
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "End Date",
      width: 300,
      render: (leagueDetails: any) => (
        <>{new Date(leagueDetails.endDate).toLocaleDateString()}</>
      ),
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
        <>
          <Link href={`/teams/league/${id}`}>View Teams</Link> |{" "}
          <a href="#">Edit</a> | <a href="#">Delete</a>
        </>
      ),
    },
  ];

  useEffect(() => {
    const params = router.query;
    if (router.isReady) {
      getLeaguesHeaders({
        sportId: params.id,
      });
      getLeagues({
        PageNumber: 1,
        PageSize: 50,
        sportId: params.id as any,
      });
    }
  }, [router]);

  useEffect(() => {
    if (isLeaguesHeadersSuccess) {
      const params = router.query;
      console.log(params);
      getLeagues({
        PageNumber: 1,
        PageSize: 50,
        sportId: params.id as any,
      });
      setPagination(leaguesHeadersData.pagination);
    }
  }, [isLeaguesHeadersSuccess]);

  useEffect(() => {
    if (isLeaguesSuccess) {
      setPagination(leaguesData.pagination);
    }
  }, [isLeaguesSuccess]);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  const handlePage = (pageNumber: number) => {
    setPagination({ ...pagination, CurrentPage: pageNumber });
    getLeagues({
      PageNumber: pageNumber,
      PageSize: pageSize,
      sportId: router.query.id as any,
    });
  };

  return (
    <>
      {isLeaguesLoading ? (
        <div>Leagues table is loading...</div>
      ) : leaguesError ? (
        <div>Something went wrong while fetching leagues</div>
      ) : (
        <Table
          columns={columns}
          data={leaguesData?.data}
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
            getLeagues({
              PageNumber: 1,
              PageSize: e.target.value,
              sportId: router.query.id as any,
            });
          }}
          className="bg-gray-800 text-white px-2 rounded-md h-[34px]"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="45">45</option>
        </select>
        <ResponsivePagination
          current={leaguesData?.pagination?.CurrentPage}
          total={leaguesData?.pagination?.TotalPages}
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
