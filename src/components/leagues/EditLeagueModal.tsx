import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import ErrorMapper from "../common/ErrorMapper";
import { leaguesApi } from "@/store/leaguesApi";
import { useRouter } from "next/router";
import reset from "@/pages/authentication/password/reset";

export type EditLeagueType = {
  name: string;
  description: string;
  leagueDetails: {
    kind: string;
    deadline: string;
    startDate: string;
    endDate: string;
    matchStartTime: string;
    matchEndTime: string;
    priceEarly: string;
    priceRegular: string;
    maxNumberOfPlayers: string;
    maxNumberOfTeams: string;
    maxNumberOfSubstitutions: string;
    minNumberOfPlayers: string;
    minNumberOfSubstitutions: string;
    minAge: string;
    maxAge: string;
    gender: string;
    award: string;
    perks: string;
  };
  leagueDocuments: {
    identification: boolean;
    schoolCertificate: boolean;
    schoolContact: boolean;
    schoolLogo: boolean;
    clubContract: boolean;
  };
};

export const EditLeagueModal = ({
  leagueId,
  setLeagueId,
  modal,
  setModal,
}: any) => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<EditLeagueType>();

  const [
    getLeagueApi,
    {
      data: dataLeague,
      isSuccess: isSuccessLeague,
      isLoading: isLoadingLeague,
      isError: isErrorLeague,
    },
  ] = leaguesApi.useLazyGetLeagueQuery();

  const [
    leaguesPutApi,
    {
      data: dataLeagues,
      isSuccess: isSuccessLeagues,
      isLoading: isLoadingLeagues,
      isError: isErrorLeagues,
      error: errorLeagues,
    },
  ] = leaguesApi.usePutLeagueMutation();

  const onSubmit = async (data: any) => {
    console.log("data", data);
    try {
      await leaguesPutApi({
        leagueId: leagueId,
        putData: {
          name: data.name,
          description: data.description,
          leagueDetails: {
            ...data.leagueDetails,
            deadline: new Date(data.leagueDetails.deadline).toISOString(),
            startDate: new Date(data.leagueDetails.startDate).toISOString(),
            endDate: new Date(data.leagueDetails.endDate).toISOString(),
            priceEarly: Number(data.leagueDetails.priceEarly),
            priceRegular: Number(data.leagueDetails.priceRegular),
            maxNumberOfPlayers: Number(data.leagueDetails.maxNumberOfPlayers),
            maxNumberOfTeams: Number(data.leagueDetails.maxNumberOfTeams),
            maxNumberOfSubstitutions: Number(
              data.leagueDetails.maxNumberOfSubstitutions
            ),
            // add seconds to time
            matchStartTime: `${data.leagueDetails.matchStartTime}${
              data.leagueDetails.matchStartTime.length === 5 ? ":00" : ""
            }`,
            matchEndTime: `${data.leagueDetails.matchEndTime}${
              data.leagueDetails.matchEndTime.length === 5 ? ":00" : ""
            }`,
            minNumberOfPlayers: Number(data.leagueDetails.minNumberOfPlayers),
            minNumberOfSubstitutions: Number(
              data.leagueDetails.minNumberOfSubstitutions
            ),
            minAge: Number(data.leagueDetails.minAge),
            maxAge: Number(data.leagueDetails.maxAge),
            award: data.leagueDetails.award,
          },
          leagueDocuments: {
            identification:
              data.leagueDocuments.identification === "true" ? true : false,
            schoolCertificate:
              data.leagueDocuments.schoolCertificate === "true" ? true : false,
            schoolContact:
              data.leagueDocuments.schoolContact === "true" ? true : false,
            schoolLogo:
              data.leagueDocuments.schoolLogo === "true" ? true : false,
            clubContract:
              data.leagueDocuments.clubContract === "true" ? true : false,
          },
        },
      }).unwrap();
      toast.success("League updated successfully");
      setModal(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isSuccessLeague) {
      console.log(new Date(dataLeague.leagueDetails.startDate));
      reset({
        ...dataLeague,
        leagueDetails: {
          ...dataLeague?.leagueDetails,
          // remove Z from end
          startDate: convertFromISODateTODateTimeForInput(
            dataLeague.leagueDetails.startDate
          ),
          endDate: convertFromISODateTODateTimeForInput(
            dataLeague.leagueDetails.endDate
          ),
          deadline: convertFromISODateTODateTimeForInput(
            dataLeague.leagueDetails.deadline
          ),
        },
      });
    }
  }, [dataLeague, isSuccessLeague, isLoadingLeague]);

  useEffect(() => {
    getLeagueApi({ leagueId });
  }, [leagueId]);

  const convertFromISODateTODateTimeForInput = (isoDateString: string) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  if (isSuccessLeague) {
    return (
      <>
        <PureModal
          //header={<div className=" p-2 font-bold text-lg text-center text-white">Category</div>}
          isOpen={modal}
          width="800px"
          onClose={() => {
            setModal(false);
            setLeagueId("");
            reset();
            return true;
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex-row space-y-3 relative"
          >
            <div className="bg-[#00A3FF] p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
              <p>League</p>
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
                {errors.name && "name is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">description</label>
              <input
                {...register("description", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors.description && "description is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">Kind</label>
              <input
                {...register("leagueDetails.kind", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.kind && "Kind is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">deadline</label>
              <input
                {...register("leagueDetails.deadline", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="datetime-local"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.deadline && "deadline is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">startDate</label>
              <input
                {...register("leagueDetails.startDate", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="datetime-local"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.startDate && "startDate is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">endDate</label>
              <input
                {...register("leagueDetails.endDate", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="datetime-local"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.endDate && "endDate is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">matchStartTime</label>
              <input
                {...register("leagueDetails.matchStartTime", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="time"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.matchStartTime &&
                  "matchStartTime is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">matchEndTime</label>
              <input
                {...register("leagueDetails.matchEndTime", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="time"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.matchEndTime &&
                  "matchEndTime is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">priceEarly</label>
              <input
                {...register("leagueDetails.priceEarly", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.priceEarly && "priceEarly is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">priceRegular</label>
              <input
                {...register("leagueDetails.priceRegular", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.priceRegular &&
                  "priceRegular is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">maxNumberOfPlayers</label>
              <input
                {...register("leagueDetails.maxNumberOfPlayers", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.maxNumberOfPlayers &&
                  "maxNumberOfPlayers is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">maxNumberOfTeams</label>
              <input
                {...register("leagueDetails.maxNumberOfTeams", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.maxNumberOfPlayers &&
                  "maxNumberOfPlayers is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">
                maxNumberOfSubstitutions
              </label>
              <input
                {...register("leagueDetails.maxNumberOfSubstitutions", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.maxNumberOfSubstitutions &&
                  "maxNumberOfSubstitutions is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">minNumberOfPlayers</label>
              <input
                {...register("leagueDetails.minNumberOfPlayers", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.minNumberOfPlayers &&
                  "minNumberOfPlayers is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">
                minNumberOfSubstitutions
              </label>
              <input
                {...register("leagueDetails.minNumberOfSubstitutions", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.minNumberOfSubstitutions &&
                  "minNumberOfSubstitutions is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">minAge</label>
              <input
                {...register("leagueDetails.minAge", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.minAge && "minAge is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">maxAge</label>
              <input
                {...register("leagueDetails.maxAge", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.maxAge && "maxAge is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">gender</label>
              <select
                className="border-2 border-[#C4F000] w-full "
                {...register("leagueDetails.gender", {
                  required: false,
                })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Unisex">Unisex</option>
              </select>
              <span className=" text-red-500">
                {errors?.leagueDetails?.gender && "gender is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">award</label>
              <input
                {...register("leagueDetails.award", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.award && "award is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">perks</label>
              <input
                {...register("leagueDetails.perks", {
                  required: false,
                })}
                className="border-2 border-[#C4F000] w-full "
                type="text"
              />
              <span className=" text-red-500">
                {errors?.leagueDetails?.perks && "perks is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">identification</label>
              <select
                className="border-2 border-[#C4F000] w-full "
                {...register("leagueDocuments.identification", {
                  required: false,
                })}
                name=""
                id=""
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <span className=" text-red-500">
                {errors?.leagueDocuments?.identification &&
                  "identification is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">schoolCertificate</label>
              <select
                className="border-2 border-[#C4F000] w-full "
                {...register("leagueDocuments.schoolCertificate", {
                  required: false,
                })}
                name=""
                id=""
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <span className=" text-red-500">
                {errors?.leagueDocuments?.schoolCertificate &&
                  "schoolCertificate is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">schoolContact</label>
              <select
                className="border-2 border-[#C4F000] w-full "
                {...register("leagueDocuments.schoolContact", {
                  required: false,
                })}
                name=""
                id=""
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <span className=" text-red-500">
                {errors?.leagueDocuments?.schoolContact &&
                  "schoolContact is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">schoolLogo</label>
              <select
                className="border-2 border-[#C4F000] w-full "
                {...register("leagueDocuments.schoolLogo", {
                  required: false,
                })}
                name=""
                id=""
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <span className=" text-red-500">
                {errors?.leagueDocuments?.schoolLogo &&
                  "schoolLogo is required"}
              </span>
            </div>
            <div className="flex justify-between flex-col">
              <label className="font-semibold pr-2">clubContract</label>
              <select
                className="border-2 border-[#C4F000] w-full "
                {...register("leagueDocuments.clubContract", {
                  required: false,
                })}
                name=""
                id=""
              >
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
              <span className=" text-red-500">
                {errors?.leagueDocuments?.clubContract &&
                  "clubContract is required"}
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
  }
  return null;
};
