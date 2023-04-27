import React, { useState } from "react";
import PageComponentTitle from "../common/PageComponentTitle";
import { SportsTable } from "./SportsTable";
import Modal from "../common/Modal";
import { CreateSportModal } from "./CreateSportModal";
import { CreateLeagueModal } from "../leagues/CreateLeagueModal";

export const Sports = () => {
  const [modal, setModal] = useState(false);
  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <PageComponentTitle
          title="Sports"
          titleDescription="List, view and edit"
          buttonTitle="Create new Category"
        />
        <div className="flex flex-wrap items-start justify-end -mb-3">
          <button
            className="inline-flex px-5 py-3 text-white bg-[#C4F000] hover:bg-[#C4F000] focus:bg-[#C4F000] rounded-md ml-6 mb-3"
            onClick={() => setModal(true)}
          >
            <svg
              aria-hidden="true"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create new Sport
          </button>
          <CreateSportModal modal={modal} setModal={setModal} />
        </div>
      </div>

      <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
          <SportsTable />
        </div>
      </section>
    </main>
  );
};
