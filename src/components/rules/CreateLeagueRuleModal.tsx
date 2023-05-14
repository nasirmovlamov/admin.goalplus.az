import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import ErrorMapper from "../common/ErrorMapper";
import { useRouter } from "next/router";
import { leaguesApi } from "../../store/leaguesApi";

export type CreateRuleDto = {
  file: any;
};

export const CreateLeagueRuleModal = ({ modal, setModal }: any) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateRuleDto>();

  const [
    leagueRulePostApi,
    {
      data: dataLeagues,
      isSuccess: isSuccessLeagues,
      isLoading: isLoadingLeagues,
      isError: isErrorLeagues,
      error: errorLeagues,
    },
  ] = leaguesApi.usePostRulesMutation();

  const onSubmit = async (data: any) => {
    console.log(router.query);
    try {
      const postData = new FormData();
      postData.append("file", data.file[0]);
      await leagueRulePostApi({
        leagueId: router.query.id as string,
        postData: postData,
      }).unwrap();
      toast.success("League created successfully");
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
            <p>Add League Rule</p>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">File</label>
            <input
              {...register("file", {
                required: true,
              })}
              className="border-2 w-full border-[#00A3FF] "
              type="file"
            />
            <span className=" text-red-500">
              {errors.file && "File is required"}
            </span>
          </div>

          <div className="flex justify-between">
            <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">
              Submit
            </button>
          </div>

          <ErrorMapper error={errorLeagues} />
        </form>
      </PureModal>
    </>
  );
};
