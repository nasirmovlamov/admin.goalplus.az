import React, { useState } from "react";
import PageComponentTitle from "../common/PageComponentTitle";
import { PaymentTable } from "./PaymentTable";
import { CreatePaymentModal } from "./CreatePaymentModal";

const Payment = () => {
  const [modal, setModal] = useState(false);
  return (
    <main className="p-6 sm:p-10 space-y-6">
      <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
        <PageComponentTitle
          title="All Payments"
          titleDescription="List, view"
        />
      </div>

      <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
        <div className="flex-grow items-center p-8 bg-white shadow rounded-lg">
          <PaymentTable />
        </div>
      </section>
    </main>
  );
};

export default Payment;
