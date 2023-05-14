import React, { useEffect, useState } from "react";
import PageComponentTitle from "../common/PageComponentTitle";
import { RulesTable } from "./RulesTable";
import router, { useRouter } from "next/router";
import { leaguesApi } from "../../store/leaguesApi";
import { CreateLeagueRuleModal } from "./CreateLeagueRuleModal";

type Props = {};

export const Rules = (props: Props) => {
  const [createNewRuleModal, setModal] = useState(false);
  const router = useRouter();
  const [
    getLeagueInfo,
    {
      data: leagueData,
      isLoading: isLeagueLoading,
      error: leagueError,
      isSuccess: isLeagueSuccess,
    },
  ] = leaguesApi.useLazyGetLeagueQuery();

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id;
      getLeagueInfo({
        leagueId: id as string,
      });
    }
  }, [router]);

  return (
    <main className="p-6 sm:p-10 space-y-6">
      <button
        onClick={() => router.back()}
        className="inline-flex px-5 py-3 text-black bg-[#C4F000] hover:bg-[#C4F000] focus:bg-[#C4F000] rounded-md ml-6 mb-3"
      >
        Back to leagues
      </button>
      <div className="flex items-start flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <PageComponentTitle
          title={leagueData?.name + " Rules"}
          titleDescription="List, view and edit"
        />
        <button
          className="inline-flex px-5 py-3 text-black bg-[#C4F000] hover:bg-[#C4F000] focus:bg-[#C4F000] rounded-md ml-6 mb-3"
          onClick={() => setModal(true)}
        >
          Create new Rule
        </button>
        <CreateLeagueRuleModal setModal={setModal} modal={createNewRuleModal} />
      </div>

      <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
          <RulesTable />
        </div>
      </section>
    </main>
  );
};
