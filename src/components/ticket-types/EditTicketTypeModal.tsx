import React, { useEffect, useLayoutEffect } from "react";
import ErrorMapper from "../common/ErrorMapper";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { ticketsApi } from "@/store/ticketApi";
import router, { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Calendar, DateObject } from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { date } from "yup";

type Props = {
  ticketTypeId: string;
  setTicketTypeId: any;
  modal: any;
  setModal: any;
};

type EditTicketTypeDto = {
  name: string;
  description: string;
  dates: any[];
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
    setValue,
    watch,
    getValues,
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
          dates: data.dates,
          price: data.price,
        },
      }).unwrap();
      toast.success("Ticket type updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  register("dates", {
    required: true,
  });

  useLayoutEffect(() => {
    if (isSuccessGetTicketType) {
      const dates = getDataTicketType?.dates.map((date: any) => {
        return new Date(date);
      });
      reset({
        name: getDataTicketType?.name,
        description: getDataTicketType?.description,
        price: getDataTicketType?.price,
        ticketCategory: getDataTicketType?.ticketCategory,
        dates: dates,
      });
    }
  }, [isSuccessGetTicketType]);

  useEffect(() => {
    if (ticketTypeId) getTicketTypeApi(ticketTypeId);
  }, [ticketTypeId]);

  useEffect(() => {
    if (watch("dates")) {
      console.log(watch("dates"));
    }
  }, [watch("dates")]);

  if (isSuccessGetTicketType)
    return (
      <>
        <PureModal
          isOpen={modal}
          width="800px"
          onClose={() => {
            setModal(false);
            setTicketTypeId(null);
            reset({});
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
                <option value="Free">Free</option>
                <option value="Festival">Festival</option>
                <option value="Workshop">Workshop</option>
                <option value="Masterclass">Masterclass</option>
                <option value="Party">Party</option>
                <option value="Tournament">Tournament</option>
                <option value="Wellness">Wellness</option>
                <option value="Show">Show</option>
                <option value="Other">Other</option>
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
              <label className="font-semibold pr-2">Dates</label>
              <Calendar
                value={getValues("dates") as any}
                onChange={(dates: any[]) => {
                  // normalize dates
                  dates = dates.map((date: any) =>
                    new Date(date).toISOString()
                  ) as any;
                  setValue("dates", dates);
                }}
                multiple={true}
                plugins={[
                  <DatePanel key="1" sort="date" />,
                  <TimePicker key="2" />,
                ]}
              />
              {/* <input
              {...register("dates", {
                required: true,
              })}
              className="border-2 w-full border-[#00A3FF] "
              type="text"
            /> */}
              <span className=" text-red-500">
                {errors.dates && "Dates is required"}
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
  return null;
};

export default EditTicketTypeModal;
