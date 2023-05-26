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

export const UsersTable = () => {
  const [SearchTerm, setSearchTerm] = useState("");
  const [userId, setUserId] = useState("");
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const [
    getUsers,
    {
      data: usersData,
      isLoading: isUsersLoading,
      error: usersError,
      isSuccess: isUsersSuccess,
    },
  ] = usersApi.useLazyGetUsersQuery();
  const {
    data: usersHeadersData,
    isLoading: isUsersHeadersLoading,
    error: usersHeadersError,
    isSuccess: isUsersHeadersSuccess,
    status: usersHeadersStatus,
    refetch: usersHeadersRefetch,
  } = usersApi.useGetHeadersQuery();
  const { formState, register, handleSubmit, setValue } = useForm();
  const [pageSize, setPageSize] = useState(25);
  const [pagination, setPagination] = useState({
    CurrentPage: 1,
    TotalPages: 25,
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
    // map roles from roles[]
    {
      key: "roles",
      dataIndex: "roles",
      title: "Roles",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
      render: (roles: any) => {
        return roles.map((role: any) =>
          role === "Captain" ? (
            <div key={role} className="text-red-500">
              Captain
            </div>
          ) : (
            role
          )
        );
      },
    },
    {
      title: "Operations",
      dataIndex: "id",
      key: "id",
      className: "text-white bg-gray-600 p-2 border-b-2",
      render: (id: any) => (
        <>
          <Link href={`/users/${id}`}>View Team</Link> |{" "}
          <button
            onClick={() => {
              setUserId(id);
              setShowPlayerModal(true);
            }}
          >
            View Player Info
          </button>
          {/* <Link href={`/users/${id}/edit`}>View</Link>  */}
        </>
      ),
    },
  ];

  const data = [
    { id: "01", name: "Jack" },
    { id: "02", name: "Rose" },
  ];

  useEffect(() => {
    console.log(isUsersHeadersSuccess);
    if (isUsersHeadersSuccess) {
      getUsers({
        PageNumber: usersHeadersData.pagination.CurrentPage,
        PageSize: pageSize,
      });
      setPagination(usersHeadersData.pagination);
    }
  }, [isUsersHeadersSuccess]);

  useEffect(() => {
    if (isUsersSuccess) {
      setPagination(usersData.pagination);
    }
  }, [isUsersSuccess]);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  const handlePage = (pageNumber: number) => {
    setPagination({ ...pagination, CurrentPage: pageNumber });
    getUsers({
      PageNumber: pageNumber,
      PageSize: pageSize,
      SearchTerm: SearchTerm,
    });
  };

  const handleSearch = () => {
    getUsers({
      PageNumber: pagination.CurrentPage,
      PageSize: pageSize,
      SearchTerm: SearchTerm,
    });
  };

  const exportUsers = async () => {
    try {
      const response = await axios.get(
        "https://api.goalplus.az/api/users/export",
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
      link.download = "users.csv";
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ShowUserPlayerInfoModalModal
        modal={showPlayerModal}
        userId={userId}
        setUserId={setUserId}
        setModal={setShowPlayerModal}
      />
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
              getUsers({
                PageNumber: pagination.CurrentPage,
                PageSize: pageSize,
              });
            }}
            className="bg-gray-800 text-white px-2 rounded-md h-[34px]"
          >
            Clear Filter
          </button>
        </div>
      </form>
      {isUsersLoading ? (
        <div>Users table is loading...</div>
      ) : usersError ? (
        <div>Something went wrong while fetching users</div>
      ) : (
        <Table
          columns={columns}
          data={usersData?.data}
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
            getUsers({
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
          current={usersData?.pagination?.CurrentPage}
          total={usersData?.pagination?.TotalPages}
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
          onClick={exportUsers}
        >
          Export all users
          <FontAwesomeIcon icon={faFileExport} className="ml-2" />
        </button>
      </div>
    </>
  );
};
