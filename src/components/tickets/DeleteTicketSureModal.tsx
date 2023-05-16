import React from "react";
import ErrorMapper from "../common/ErrorMapper";
import toast from "react-hot-toast";
import { ticketsApi } from "@/store/ticketApi";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

type Props = {
  ticketTypeId: string;
  modal: any;
  setModal: any;
};

const DeleteTicketTypeSureModal = ({
  ticketTypeId,
  modal,
  setModal,
}: Props) => {
  const [
    ticketTypeDeleteApi,
    {
      data: dataTicketTypes,
      isSuccess: isSuccessTicketTypes,
      isLoading: isLoadingTicketTypes,
      isError: isErrorTicketTypes,
      error: errorTicketTypes,
    },
  ] = ticketsApi.useDeleteTicketTypeMutation();

  const deleteSport = async (data: any) => {
    console.log(data);
    try {
      await ticketTypeDeleteApi(ticketTypeId).unwrap();
      toast.success("League Deleted Successfully");
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
            <p>Are you sure to delete sport</p>
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
              onClick={deleteSport}
              className="bg-gray-700 text-white p-3 w-full mt-5 text-lg"
            >
              Yeah
            </button>
          </div>

          <ErrorMapper error={errorTicketTypes} />
        </div>
      </PureModal>
    </>
  );
};

export default DeleteTicketTypeSureModal;
