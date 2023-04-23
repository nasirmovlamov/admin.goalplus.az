import { usersApi } from "@/store/usersApi";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";

const CategoryTable = () => {
  const [
    getUsers,
    { data: usersData, isLoading: isUsersLoading, error: usersError },
  ] = usersApi.useLazyGetUsersQuery();
  const [pagination, setPagination] = useState({
    PageNumber: 1,
    PageSize: 10,
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
      dataIndex: "",
      key: "operations",
      className: "text-white bg-gray-600 p-2 border-b-2",
      render: () => (
        <>
          <a href="#">View</a> | <a href="#">Edit</a> | <a href="#">Delete</a>
        </>
      ),
    },
  ];

  const data = [
    { id: "01", name: "Jack" },
    { id: "02", name: "Rose" },
  ];

  useEffect(() => {
    getUsers({});
  }, []);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      {isUsersLoading ? (
        <div>Users table is loading...</div>
      ) : usersError ? (
        <div>Something went wrong while fetching users</div>
      ) : (
        <Table
          columns={columns}
          data={usersData}
          rowKey="id"
          className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
        />
      )}
      {/* <Pagination
        activePage={activePage}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        innerClass="js-ul"
        itemClass="js-li"
        linkClass="page-link"
      /> */}
    </>
  );
};

export default CategoryTable;
