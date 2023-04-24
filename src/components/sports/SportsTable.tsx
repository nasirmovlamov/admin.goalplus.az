import { sportsApi } from "@/store/sportsApi";
import { data } from "autoprefixer";
import Link from "next/link";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";

export const SportsTable = () => {
  const [
    getSports,
    {
      data: sportsData,
      isLoading: isSportsLoading,
      error: sportsError,
      isSuccess: isSportsSuccess,
    },
  ] = sportsApi.useLazyGetSportsQuery();
  // const {
  //   data: sportsHeadersData,
  //   isLoading: isSportsHeadersLoading,
  //   error: sportsHeadersError,
  //   isSuccess: isSportsHeadersSuccess,
  //   status: sportsHeadersStatus,
  //   refetch: sportsHeadersRefetch,
  // } = sportsApi.useGetHeadersQuery();

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
      title: "Sport Name",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Operations",
      dataIndex: "id",
      key: "id",
      className: "text-white bg-gray-600 p-2 border-b-2",
      render: (id: any) => (
        <>
          <Link href={`/leagues/sport/${id}`}>View Leagues</Link> |{" "}
          <a href={`/leagues/sport/${id}/edit`}>Edit</a> |{" "}
          <a href="#">Delete</a>
        </>
      ),
    },
  ];

  const data = [
    { id: "01", name: "Jack" },
    { id: "02", name: "Rose" },
  ];

  useEffect(() => {
    getSports({
      PageNumber: 1,
      PageSize: pageSize,
    });
  }, []);

  useEffect(() => {
    console.log(sportsData?.pagination);
    if (isSportsSuccess) {
      setPagination(sportsData.pagination);
    }
  }, [isSportsSuccess]);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  const handlePage = (pageNumber: number) => {
    setPagination({ ...pagination, CurrentPage: pageNumber });
    getSports({
      PageNumber: pageNumber,
      PageSize: pageSize,
    });
  };

  return (
    <>
      {isSportsLoading ? (
        <div>Sports table is loading...</div>
      ) : sportsError ? (
        <div>Something went wrong while fetching sports</div>
      ) : (
        <Table
          columns={columns}
          data={sportsData?.data}
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
            getSports({
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
          current={sportsData?.pagination?.CurrentPage}
          total={sportsData?.pagination?.TotalPages}
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
