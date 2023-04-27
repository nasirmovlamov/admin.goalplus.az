import { playersApi } from "@/store/playersApi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import ErrorMapper from "../common/ErrorMapper";

export const DeletePlayerSureModal = ({ playerId, modal, setModal }: any) => {
  //For Image Preview
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [
    playersDeleteApi,
    {
      data: dataPlayers,
      isSuccess: isSuccessPlayers,
      isLoading: isLoadingPlayers,
      isError: isErrorPlayers,
      error: errorPlayers,
    },
  ] = playersApi.useDeletePlayerMutation();

  const deletePlayer = async (data: any) => {
    try {
      await playersDeleteApi({
        playerId: playerId,
      });
      toast.success("Player Deleted Successfully");
      setModal(false);
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
        <div className="flex-row space-y-3 relative">
          <div className="bg-[#00A3FF] p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>Are you sure to delete player ? </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setModal(false);
              }}
              className="bg-gray-700 text-white p-3 w-full mt-5 text-lg"
            >
              No
            </button>
            <button
              onClick={deletePlayer}
              className="bg-gray-700 text-white p-3 w-full mt-5 text-lg"
            >
              Yeah
            </button>
          </div>

          <ErrorMapper error={errorPlayers} />
        </div>
      </PureModal>
    </>
  );
};
