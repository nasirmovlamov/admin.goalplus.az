import { leaguesApi } from "@/store/leaguesApi";
import { data } from "autoprefixer";
import Link from "next/link";
import router, { useRouter } from "next/router";
import Table from "rc-table";
import React, { use, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";
import { DeleteSportSureModal } from "../sports/DeleteSportSureModal";
import { EditSportModal } from "../sports/EditSportModal";
import { EditLeagueModal } from "./EditLeagueModal";
import { DeleteLeagueSureModal } from "./DeleteLeagueSureModal copy";

export const LeaguesTable = () => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [leagueId, setLeagueId] = useState("");

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
      title: "Name",
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "description",
      dataIndex: "description",
      title: "Description",
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "award",
      width: 50,
      render: (leagueDetails: any) => <>{leagueDetails.award}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "deadline",
      width: 100,
      render: (leagueDetails: any) => <>{leagueDetails.deadline}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "gender",
      width: 100,
      render: (leagueDetails: any) => <>{leagueDetails.gender}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "kind",
      width: 100,
      render: (leagueDetails: any) => <>{leagueDetails.kind}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "matchEndTime",
      width: 50,
      render: (leagueDetails: any) => <>{leagueDetails.matchEndTime}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "matchStartTime",
      width: 50,
      render: (leagueDetails: any) => <>{leagueDetails.matchStartTime}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "maxAge",
      width: 100,
      render: (leagueDetails: any) => <>{leagueDetails.maxAge}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Max number of players",
      width: 100,
      render: (leagueDetails: any) => <>{leagueDetails.maxNumberOfPlayers}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Max number of teams",
      width: 100,
      render: (leagueDetails: any) => <>{leagueDetails.maxNumberOfTeams}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Min number of players",
      width: 100,
      render: (leagueDetails: any) => <>{leagueDetails.minNumberOfPlayers}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Price Early",
      width: 100,
      render: (leagueDetails: any) => <>{leagueDetails.priceEarly}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Price Regular",
      width: 100,
      render: (leagueDetails: any) => <>{leagueDetails.priceRegular}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "leagueDetails",
      dataIndex: "leagueDetails",
      title: "Start Date",
      width: 100,
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
      width: 100,
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
      width: 100,
      className: "text-white bg-gray-600 p-2 border-b-2",
      render: (id: any) => (
        <div className="flex gap-4">
          <Link href={`/teams/league/${id}`}>View Teams</Link> |
          <Link href={`/leagues/rules/${id}`}>View Rules</Link>|
          <button
            onClick={() => {
              setLeagueId(id);
              setEditModalOpen(true);
            }}
            className="bg-green-500 p-2 rounded-md cursor-pointer"
          >
            Edit
          </button>
        </div>
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
      <EditLeagueModal
        leagueId={leagueId}
        modal={isEditModalOpen}
        setModal={setEditModalOpen}
      />
      <DeleteLeagueSureModal
        leagueId={leagueId}
        modal={isDeleteModalOpen}
        setModal={setDeleteModalOpen}
      />

      {isLeaguesLoading ? (
        <div>Leagues table is loading...</div>
      ) : leaguesError ? (
        <div>Something went wrong while fetching leagues</div>
      ) : (
        <Table
          columns={columns}
          data={leaguesData?.data}
          rowKey="id"
          className="bg-[#C4F000] text-xs p-4 w-full text-center rc-table-custom font-semibold "
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
