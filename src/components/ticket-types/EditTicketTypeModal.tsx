import reset from "@/pages/authentication/password/reset";
import React, { useEffect } from "react";
import ErrorMapper from "../common/ErrorMapper";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { ticketsApi } from "@/store/ticketApi";
import router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  ticketTypeId: string;
  setTicketTypeId: any;
  modal: any;
  setModal: any;
};

type EditTicketTypeDto = {
  name: string;
  description: string;
  date: string;
  dateStart: string;
  dateEnd: string;
  price: number;
  ticketCategory: string;
};

const EditTicketTypeModal = ({
  ticketTypeId,
  modal,
  setModal,
  setTicketTypeId,
}: Props) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm<EditTicketTypeDto>();

  const [
    getTicketTypeApi,
    {
      data: getDataTicketType,
      isSuccess: isSuccessGetTicketType,
      isLoading: isLoadingGetTicketType,
      isError: isErrorGetTicketType,
      error: errorGetTicketType,
    },
  ] = ticketsApi.useLazyGetTicketTypeQuery();
  const [
    ticketTypePostApi,
    {
      data: dataTicketType,
      isSuccess: isSuccessTicketType,
      isLoading: isLoadingTicketType,
      isError: isErrorTicketType,
      error: errorTicketType,
    },
  ] = ticketsApi.usePutTicketTypeMutation();

  const onSubmit = async (data: any) => {
    try {
      await ticketTypePostApi({
        id: ticketTypeId,
        postData: {
          name: data.name,
          description: data.description,
          date: new Date(data.date).toISOString(),
          dateStart: new Date(data.dateStart).toISOString(),
          dateEnd: new Date(data.dateEnd).toISOString(),
          price: data.price,
        },
      }).unwrap();
      toast.success("Ticket type updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isSuccessGetTicketType) {
      reset({
        name: getDataTicketType?.name,
        description: getDataTicketType?.description,
        price: getDataTicketType?.price,
        ticketCategory: getDataTicketType?.ticketCategory,
        date: getDataTicketType?.date.slice(0, 10),
        dateStart: getDataTicketType?.dateStart?.slice(0, 10),
        dateEnd: getDataTicketType?.dateEnd?.slice(0, 10),
      });
    }
  }, [isSuccessGetTicketType]);

  useEffect(() => {
    if (ticketTypeId) getTicketTypeApi(ticketTypeId);
  }, [ticketTypeId]);

  return (
    <>
      <PureModal
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          setTicketTypeId(null);
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
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Unlimited">Unlimited</option>
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
              {errors.name && "Price is required"}
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

export default EditTicketTypeModal;
