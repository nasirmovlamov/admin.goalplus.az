import React, { useState } from "react";
import PageComponentTitle from "../common/PageComponentTitle";
import { TicketsTable } from "./TicketsTable";

type Props = {};

const TicketTypes = (props: Props) => {
  const [modal, setModal] = useState(false);

  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="items-start flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <PageComponentTitle
          title="Ticket Types"
          titleDescription="List, view and edit"
        />
        <button
          className="bg-[#C4F000] text-black font-bold py-2 px-4 rounded"
          onClick={() => setModal(true)}
        >
          Create Ticket Type
        </button>
      </div>

      <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
          <TicketsTable />
        </div>
      </section>
    </main>
  );
};

export default TicketTypes;
