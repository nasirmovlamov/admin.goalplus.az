import { data } from "autoprefixer";
import Link from "next/link";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { leaguesApi } from "../../store/leaguesApi";
import { useRouter } from "next/router";

export const RulesTable = () => {
  const router = useRouter();
  const [SearchTerm, setSearchTerm] = useState("");
  const [
    getLeagueRules,
    {
      data: rulesData,
      isLoading: isRulesLoading,
      error: rulesError,
      isSuccess: isRulesSuccess,
    },
  ] = leaguesApi.useLazyGetRulesQuery();

  const { formState, register, handleSubmit, setValue } = useForm();

  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "id",
      width: 100,
      className: "text-white bg-gray-800 p-2 border-r-2 border-b-2",
      rowClassName: "bg-black-ripon",
    },
    {
      key: "objectUrl ",
      dataIndex: "objectUrl",
      title: "objectUrl",
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
          <Link href={`/rules/${id}`}>View</Link> |{" "}
          <Link href={`/rules/${id}/edit`}>View</Link> | <button>Delete</button>
        </>
      ),
    },
  ];

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id;
      getLeagueRules({
        leagueId: id as string,
      });
    }
  }, [router]);

  return (
    <>
      {!rulesData?.objectUrl && (
        <span>There is not any rule linked to league</span>
      )}
      {isRulesLoading ? (
        <div>Rules table is loading...</div>
      ) : rulesError ? (
        <div>Something went wrong while fetching rules</div>
      ) : (
        <div>
          {rulesData?.objectUrl && (
            <a
              target="_blank"
              className="text-white bg-gray-600 p-2 border-b-2"
              href={rulesData?.objectUrl}
            >
              Link to Rule
            </a>
          )}
        </div>
        // <Table
        //   columns={columns}
        //   data={[rulesData?.data]}
        //   rowKey="id"
        //   className="bg-[#C4F000] p-4 w-full text-center rc-table-custom font-semibold "
        // />
      )}
    </>
  );
};
