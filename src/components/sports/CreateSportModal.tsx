import { sportsApi } from "@/store/sportsApi";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import ErrorMapper from "../common/ErrorMapper";

export const CreateSportModal = ({ modal, setModal }: any) => {
  //For Image Preview
  const [selectedImage, setSelectedImage] = useState();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [
    sportsPostApi,
    {
      data: dataSports,
      isSuccess: isSuccessSports,
      isLoading: isLoadingSports,
      isError: isErrorSports,
      error: errorSports,
    },
  ] = sportsApi.usePostSportMutation();
  // This function will be triggered when the file field change
  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    // setSelectedImage();
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      await sportsPostApi(data);
      toast.success("Sport Created Successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!modal) {
      // setSelectedImage();
    }
  }, [modal]);
  //console.log('modal modal', modal)
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
            <p>Sport</p>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">Name</label>
            <input
              {...register("name", {
                required: true,
              })}
              className="border-2 w-full border-[#00A3FF] "
              type="text"
            />
            <span className=" text-red-500">
              {errors.name && "Name is required"}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">Description</label>
            <input
              {...register("description", {
                required: false,
              })}
              className="border-2 border-[#C4F000] w-full "
              type="text"
            />
            <span className=" text-red-500">
              {errors.description && "Description is required"}
            </span>
          </div>

          <div className="flex justify-between">
            <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">
              Submit
            </button>
          </div>

          <ErrorMapper error={errorSports} />
        </form>
      </PureModal>
    </>
  );
};
