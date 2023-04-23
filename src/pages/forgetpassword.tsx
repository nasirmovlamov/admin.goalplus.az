import { useForm } from "react-hook-form";
import { authApi } from "@/store/authApi";
import { toast } from "react-hot-toast";
import { useMemo } from "react";

type Props = {};
export default function ForgetPassword(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    email: string;
  }>({});

  const [
    requestPasswordResetApi,
    {
      isLoading: passwordResetRequestLoading,
      isError: isPasswordResetRequestError,
      isSuccess: passwordResetRequestSuccess,
      data: passwordResetRequestData,
      error: passwordResetRequestError,
    },
  ] = authApi.useRequestPasswordResetMutation();

  const onSubmit = async (data: any) => {
    try {
      await requestPasswordResetApi(data);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error("Something went wrong");
    }

    console.log(data);
  };

  const passwordRequestErrorMemo = useMemo(() => {
    if (isPasswordResetRequestError) {
      return passwordResetRequestError as any;
    }
  }, [isPasswordResetRequestError, passwordResetRequestError]);

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex max-w-[1230px] justify-center w-full">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-[300px] w-full"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              <b>Enter email address</b>
            </label>
            <p className="text-xs text-gray-500">
              In order to reset your password, please enter your email address
              below.
            </p>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Email"
            />
            <span className="text-red-500">{errors?.email?.message}</span>
          </div>
          <button
            type="submit"
            className="bg-[#032974] text-white px-[6px] py-[12px] rounded-md"
          >
            Submit{" "}
            {passwordResetRequestLoading && (
              <span className="animate-spin">...</span>
            )}
          </button>

          {passwordResetRequestSuccess && (
            <div className="text-green-500">
              Password reset link sent to your email, please check your email
            </div>
          )}

          {passwordResetRequestError &&
            ("status" in passwordResetRequestError ? (
              <div>
                <div>
                  {passwordRequestErrorMemo?.data &&
                    Object.keys(passwordRequestErrorMemo.data).map((key) => {
                      return (
                        <p key={key} className="text-red-500">
                          {passwordRequestErrorMemo.data[key]}
                        </p>
                      );
                    })}
                </div>
              </div>
            ) : null)}
        </form>
      </div>
    </div>
  );
}
