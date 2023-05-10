import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import ErrorMapper from "../common/ErrorMapper";
import { leaguesApi } from "@/store/leaguesApi";
import { useRouter } from "next/router";
import { paymentApi } from "@/store/paymentApi";

export type CreatePaymentType = {};

export const CreatePaymentModal = ({ sportId, modal, setModal }: any) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePaymentType>();

  // const [
  //   leaguesPostApi,
  //   {
  //     data: dataPayments,
  //     isSuccess: isSuccessPayments,
  //     isLoading: isLoadingPayments,
  //     isError: isErrorPayments,
  //     error: errorPayments,
  //   },
  // ] = paymentApi.usePostPaymentMutation();

  const onSubmit = async (data: any) => {
    console.log(router.query);
    try {
      // await leaguesPostApi({
      //   sportId: router.query.id as string,
      //   postData: data,
      // }).unwrap();
      toast.success("Payment created successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <PureModal
        //header={<div className=" p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          return true;
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-row space-y-3 relative"
        >
          <div className="bg-[#00A3FF] p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Payment</p>
          </div>

          <div className="flex justify-between">
            <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">
              Submit
            </button>
          </div>

          {/* <ErrorMapper error={errorPayments} /> */}
        </form>
      </PureModal>
    </>
  );
};
