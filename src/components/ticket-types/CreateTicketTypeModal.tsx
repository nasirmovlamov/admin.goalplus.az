import React, { useEffect } from "react";
import ErrorMapper from "../common/ErrorMapper";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ticketsApi } from "@/store/ticketApi";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { Calendar, DateObject } from "react-multi-date-picker";

type Props = {
  modal: any;
  setModal: any;
};

type CreateTicketTypeDto = {
  name: string;
  description: string;
  dates: any[];
  price: number;
  ticketCategory: string;
};

const CreateTicketTypeModal = ({ modal, setModal }: Props) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    trigger,
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
        dates: data.dates,
        price: data.price,
      };
      await ticketTypePostApi(postData).unwrap();
      toast.success("Ticket type created successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  register("dates", {
    required: true,
  });

  // useEffect(() => {
  //   if (watch("dates")?.length) {
  //     console.log(watch("dates"));
  //     const date = new Date(watch("dates")[0]);
  //     console.log(date.toISOString());
  //   }
  // }, [watch("dates")]);

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
              {errors.price && "Price is required"}
            </span>
          </div>

          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">Dates</label>
            <Calendar
              value={watch("dates")}
              onChange={(dates: DateObject[]) => {
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
};

export default CreateTicketTypeModal;
