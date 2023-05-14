import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";
import ErrorMapper from "../common/ErrorMapper";
import { useRouter } from "next/router";
import { playersApi } from "@/store/playersApi";
import Link from "next/link";

export const ShowUserPlayerInfoModalModal = ({
  modal,
  setModal,
  userId,
  setUserId,
}: any) => {
  const router = useRouter();

  const {
    data: getUserPlayerInfoData,
    isLoading: isGetUserPlayerInfoLoading,
    error: getUserPlayerInfoError,
    isSuccess: isGetUserPlayerInfoSuccess,
  } = playersApi.useGetUserPlayerInfoQuery({
    userId: userId,
  });

  if (isGetUserPlayerInfoLoading) {
    return null;
  }
  if (userId === "") {
    return null;
  }

  return (
    <>
      <PureModal
        //header={<div className=" p-2 font-bold text-lg text-center text-white">Category</div>}
        isOpen={modal}
        width="800px"
        onClose={() => {
          setModal(false);
          setUserId("");
          return true;
        }}
      >
        <div className="flex-row space-y-3 relative">
          <div className="bg-[#00A3FF] p-2 font-bold text-lg text-center text-white -mt-4 -mx-4 mb-5 pb-4">
            <p>User Player Info </p>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">id</label>
            <span className="text-gray-400">{getUserPlayerInfoData?.id}</span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">active</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.active?.toString()
                ? getUserPlayerInfoData?.active?.toString()
                : "-"}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">firstName</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.firstName
                ? getUserPlayerInfoData?.firstName
                : "-"}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">image</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.image ? (
                <a href={getUserPlayerInfoData?.image} target="_blank">
                  <img
                    src={getUserPlayerInfoData?.image}
                    className="w-20 h-20"
                  />
                </a>
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">isCaptain</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.isCaptain?.toString()
                ? getUserPlayerInfoData?.isCaptain?.toString()
                : "-"}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">jerseyNumber</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.jerseyNumber
                ? getUserPlayerInfoData?.jerseyNumber
                : "-"}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">lastName</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.lastName
                ? getUserPlayerInfoData?.lastName
                : "-"}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">paid</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.paid?.toString()
                ? getUserPlayerInfoData?.paid?.toString()
                : "-"}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">currentSchool</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.playerDetails?.currentSchool ? (
                <a
                  href={getUserPlayerInfoData?.playerDetails?.currentSchool}
                  target="_blank"
                >
                  Link to certificate
                </a>
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">identificationUrl</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.playerDetails?.identificationUrl ? (
                <a
                  href={getUserPlayerInfoData?.playerDetails?.identificationUrl}
                  target="_blank"
                >
                  Link to idCard
                </a>
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">quote</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.playerDetails?.quote
                ? getUserPlayerInfoData?.playerDetails?.quote
                : "-"}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">schoolCertificateUrl</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.playerDetails?.schoolCertificateUrl ? (
                <a
                  href={
                    getUserPlayerInfoData?.playerDetails?.schoolCertificateUrl
                  }
                  target="_blank"
                >
                  Link to schoolCertificate
                </a>
              ) : (
                "-"
              )}
            </span>
          </div>
          <div className="flex justify-between flex-col">
            <label className="font-semibold pr-2">position</label>
            <span className="text-gray-400">
              {getUserPlayerInfoData?.position
                ? getUserPlayerInfoData?.position
                : "-"}
            </span>
          </div>
        </div>
      </PureModal>
    </>
  );
};
