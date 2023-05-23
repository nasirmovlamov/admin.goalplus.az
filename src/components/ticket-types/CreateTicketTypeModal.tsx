import React from "react";
import ErrorMapper from "../common/ErrorMapper";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ticketsApi } from "@/store/ticketApi";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
type Props = {
  modal: any;
  setModal: any;
};

type CreateTicketTypeDto = {
  name: string;
  description: string;
  date: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  ticketCategory: string;
};

const CreateTicketTypeModal = ({ modal, setModal }: Props) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateTicketTypeDto>();

  const [
    ticketTypePostApi,
    {
      data: dataTicketType,
      isSuccess: isSuccessTicketType,
      isLoading: isLoadingTicketType,
      isError: isErrorTicketType,
      error: errorTicketType,
    },
  ] = ticketsApi.usePostTicketTypeMutation();

  const onSubmit = async (data: any) => {
    try {
      const postData = {
        name: data.name,
        description: data.description,
        date: new Date(data.date).toISOString(),
        dateStart: new Date(data.dateStart).toISOString(),
        dateEnd: new Date(data.dateEnd).toISOString(),
        price: data.price,
      };
      await ticketTypePostApi(postData).unwrap();
      toast.success("Ticket type created successfully");
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
            <p>Add Ticket Type</p>
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
            <label className="font-semibold pr-2">Ticket Category</label>
            <select
              {...register("ticketCategory", { required: true })}
              className="border-2 w-full border-[#00A3FF] "
            >
              <option value="Unlimited">Unlimited</option>
              <option value="Monthly">Monthly</option>
              <option value="Daily">Daily</option>
              <option value="Free">Free</option>
            </select>
            <span className=" text-red-500">
              {errors.ticketCategory && "TicketCategory is required"}
            </span>
          </div>

          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">Description</label>
            <input
              {...register("description", {
                required: true,
              })}
              className="border-2 w-full border-[#00A3FF] "
              type="text"
            />
            <span className=" text-red-500">
              {errors.description && "Description is required"}
            </span>
          </div>

          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">Price</label>
            <input
              {...register("price", {
                required: true,
              })}
              className="border-2 w-full border-[#00A3FF] "
              type="text"
            />
            <span className=" text-red-500">
              {errors.price && "Price is required"}
            </span>
          </div>

          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">Date</label>
            <input
              {...register("date", {
                required: true,
              })}
              className="border-2 w-full border-[#00A3FF] "
              type="date"
            />
            <span className=" text-red-500">
              {errors.date && "Date is required"}
            </span>
          </div>

          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">Date End</label>
            <input
              {...register("dateEnd", {
                required: true,
              })}
              className="border-2 w-full border-[#00A3FF] "
              type="date"
            />
            <span className=" text-red-500">
              {errors.dateEnd && "Date End is required"}
            </span>
          </div>

          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">Date Start</label>
            <input
              {...register("dateStart", {
                required: true,
              })}
              className="border-2 w-full border-[#00A3FF] "
              type="date"
            />
            <span className=" text-red-500">
              {errors.dateStart && "Date Start is required"}
            </span>
          </div>

          <div className="flex justify-between">
            <button className="bg-gray-700 text-white p-3 w-full mt-5 text-lg">
              Submit
            </button>
          </div>

          <ErrorMapper error={errorTicketType} />
        </form>
      </PureModal>
    </>
  );
};

export default CreateTicketTypeModal;
