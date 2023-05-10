import { paymentApi } from "@/store/paymentApi";
import { data } from "autoprefixer";
import Link from "next/link";
import router, { useRouter } from "next/router";
import Table from "rc-table";
import React, { use, useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import ResponsivePagination from "react-responsive-pagination";
import { DeleteSportSureModal } from "../sports/DeleteSportSureModal";
import { EditSportModal } from "../sports/EditSportModal";

export const TeamPaymentTable = () => {
  const [paymentId, setPaymentId] = useState("");

  const router = useRouter();
  const [
    getPayment,
    {
      data: paymentData,
      isLoading: isPaymentLoading,
      error: paymentError,
      isSuccess: isPaymentSuccess,
    },
  ] = paymentApi.useLazyGetTeamPaymentsQuery();
  const [
    getPaymentHeaders,
    {
      data: paymentHeadersData,
      isLoading: isPaymentHeadersLoading,
      error: paymentHeadersError,
      isSuccess: isPaymentHeadersSuccess,
      status: paymentHeadersStatus,
    },
  ] = paymentApi.useLazyGetPaymentsHeadersQuery();

  const [pageSize, setPageSize] = useState(10);
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    TotalPages: 10,
    TotalCount: 0,
  });

  const columns = [
    {
      key: "amount",
      dataIndex: "amount",
      title: "Amount",
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "bankTransaction",
      dataIndex: "bankTransaction",
      title: "Bank Transaction",
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "bankTransaction",
      dataIndex: "bankTransaction",
      title: "Bank Transaction",
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "cardMask",
      dataIndex: "cardMask",
      title: "Card Mask",
      width: 50,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },

    {
      key: "cardName",
      dataIndex: "cardName",
      title: "Card Name",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "code",
      dataIndex: "code",
      title: "Code",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "creationTime",
      dataIndex: "creationTime",
      title: "Creation Time",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "firstName",
      dataIndex: "firstName",
      title: "First Name",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "id",
      dataIndex: "id",
      title: "id",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "lastName",
      dataIndex: "lastName",
      title: "Last Name",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "mobile",
      dataIndex: "mobile",
      title: "mobile",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "otherAttribute",
      dataIndex: "otherAttribute",
      title: "otherAttribute",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "paymentReason",
      dataIndex: "paymentReason",
      title: "paymentReason",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "requestTime",
      dataIndex: "requestTime",
      title: "requestTime",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "retrievalReferenceNumber",
      dataIndex: "retrievalReferenceNumber",
      title: "retrievalReferenceNumber",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "status",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "transaction",
      dataIndex: "transaction",
      title: "transaction",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "userId",
      dataIndex: "userId",
      title: "userId",
      width: 100,
      render: (paymentDetails: any) => <>{paymentDetails}</>,
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
          <Link href={`/teams/payment/${id}`}>View Teams</Link> | |
          <button
            onClick={() => {
              setPaymentId(id);
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
      getPaymentHeaders();
      const teamId = params.id;
      getPayment({
        teamId: teamId as any,
        PageNumber: 1,
        PageSize: 50,
      });
    }
  }, [router]);

  useEffect(() => {
    if (isPaymentHeadersSuccess) {
      const params = router.query;
      console.log(params);
      const teamId = params.id;
      getPayment({
        teamId: teamId as any,
        PageNumber: 1,
        PageSize: 50,
      });
      setPagination(paymentHeadersData.pagination);
    }
  }, [isPaymentHeadersSuccess]);

  useEffect(() => {
    if (isPaymentSuccess) {
      setPagination(paymentData.pagination);
    }
  }, [isPaymentSuccess]);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  const handlePage = (pageNumber: number) => {
    setPagination({ ...pagination, CurrentPage: pageNumber });
    const teamId = router.query.id;
    getPayment({
      teamId: teamId as any,
      PageNumber: pageNumber,
      PageSize: pageSize,
    });
  };

  return (
    <>
      {/* <EditPaymentModal
        paymentId={paymentId}
        modal={isEditModalOpen}
        setModal={setEditModalOpen}
      />
      <DeletePaymentSureModal
        paymentId={paymentId}
        modal={isDeleteModalOpen}
        setModal={setDeleteModalOpen}
      /> */}

      {isPaymentLoading ? (
        <div>Payment table is loading...</div>
      ) : paymentError ? (
        <div>Something went wrong while fetching payment</div>
      ) : (
        <div className="w-[calc(100vw - 120px)] overflow-x-scroll bg-[#C4F000]">
          <Table
            columns={columns}
            data={paymentData}
            rowKey="id"
            className=" text-xs p-4 w-full text-center rc-table-custom font-semibold "
          />
        </div>
      )}

      <div className="flex justify-center gap-4 mt-2 items-center">
        <select
          name="select page pagination"
          id=""
          value={pageSize}
          onChange={(e: any) => {
            setPageSize(e.target.value);
            const teamId = router.query.id;
            getPayment({
              teamId: teamId as any,
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
          current={paymentData?.pagination?.CurrentPage}
          total={paymentData?.pagination?.TotalPages}
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
