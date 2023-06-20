import React, { useEffect } from "react";
import ErrorMapper from "../common/ErrorMapper";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ticketsApi } from "@/store/ticketApi";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import { DevTool } from "@hookform/devtools";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { Calendar, DateObject } from "react-multi-date-picker";
import { normalize } from "path";
import { date } from "yup";
import WeekComponent from "./WeekComponent";

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
  active: boolean;
};

const CreateTicketTypeModal = ({ modal, setModal }: Props) => {
  const router = useRouter();
  const [selectDateRangeItem, setSelectDateRangeItem] = React.useState<any>();
  const [dateWeekDays, setDateWeekDays] = React.useState<any>([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    trigger,
    control,
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
        active: data.active,
        dates: dateWeekDays.map((date: any) => {
          return {
            startTime: new Date(date?.startDate).toISOString(),
            endTime: new Date(date?.endDate).toISOString(),
            weekDays: date?.weekDays,
          };
        }),
        price: data.price,
        ticketCategory: data.ticketCategory,
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
          <div className="flex flex-col items-start w-max">
            <div className="flex justify-start gap-2">
              <input
                {...register("active", {})}
                className="border-2 border-[#00A3FF] "
                type="checkbox"
                id="activeInput"
              />
              <label htmlFor="activeInput" className="font-semibold w-max">
                Is Active
              </label>
            </div>

            <span className=" text-red-500">
              {errors.active && "Name is required"}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">Ticket Category</label>
            <select
              {...register("ticketCategory", { required: true })}
              className="border-2 w-full border-[#00A3FF] "
            >
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
            <textarea
              {...register("description", {
                required: true,
              })}
              className="border-2 w-full border-[#00A3FF] "
            ></textarea>
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
            <div className="flex flex-col gap-2">
              <Calendar
                style={{ width: "100%" }}
                value={watch("dates")}
                onChange={(dates: any) => {
                  // change dates from i to new Date
                  // dates = dates.map((dateArray: any) => {
                  //   dateArray = dateArray.map(
                  //     (date: DateObject, index: any) => {
                  //       return date.toUTC();
                  //     }
                  //   );
                  //   return dateArray;
                  // });
                  //add ids to dates arrays
                  let datesWithIds = dates.map((dateArray: any) => {
                    return {
                      id: Math.floor(Math.random() * 1000000000),
                      startDate: dateArray[0],
                      endDate: dateArray[1],
                      weekDays: [],
                    };
                  });
                  setSelectDateRangeItem(null);
                  setDateWeekDays(datesWithIds);
                  setValue("dates", dates);
                }}
                multiple
                range
                plugins={[
                  <DatePanel key="1" position="bottom" />,
                  <TimePicker key="2" position="bottom" />,
                ]}
              />
              <div className="gap-2 border rounded-md p-2 shadow-lg break-words">
                <h4>Select date range for adding repeated weekdays</h4>
                <select
                  name=""
                  id=""
                  className="border rounded-md p-1 mt-2"
                  value={selectDateRangeItem}
                  onChange={(e) => {
                    console.log("e", e.target.value);
                    setSelectDateRangeItem(e.target.value);
                  }}
                >
                  <option value="none">Select date for editing weekdays</option>
                  {dateWeekDays?.map((date: any) => (
                    <option value={date?.id} key={date?.id}>
                      {new Date(date?.startDate) +
                        " ~ " +
                        new Date(date?.endDate)}
                    </option>
                  ))}
                </select>

                <p>Click to activate weekdays</p>
                <WeekComponent
                  dateWeekDays={dateWeekDays}
                  selectDateRangeItem={selectDateRangeItem}
                  setDateWeekDays={setDateWeekDays}
                />
              </div>
            </div>
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
          {/* <DevTool control={control} />  */}
          <ErrorMapper error={errorTicketType} />
        </form>
      </PureModal>
    </>
  );
};

export default CreateTicketTypeModal;
