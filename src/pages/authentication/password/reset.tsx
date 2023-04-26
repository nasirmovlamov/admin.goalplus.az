import { authApi } from "@/store/authApi";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {};
export default function PasswordReset(props: Props) {
  const [
    resetPasswordApi,
    {
      isLoading: resetPasswordLoading,
      isError: isResetPasswordError,
      isSuccess: resetPasswordSuccess,
      data: resetPasswordData,
      error: resetPasswordError,
    },
  ] = authApi.useForgetPasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    const params = router.query;
    if (params.Token && params.Email) {
      try {
        const postData = {
          password: data.password,
          confirmPassword: data.confirmPassword,
          token: params.Token,
          email: params.Email,
        };
        await resetPasswordApi(postData as any).unwrap();
        toast.success("Password reset successfully");
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
  };

  const passwordResetErrorMemo = useMemo(() => {
    if (isResetPasswordError) {
      return resetPasswordError as any;
    }
  }, [isResetPasswordError, resetPasswordError]);

  return (
    <div className="flex justify-center pt-[50px] pb-[50px]">
      <div className="flex max-w-[1230px] justify-center w-full">
        <form
          action=""
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-[300px] w-full"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              <b>Enter new password</b>
            </label>
            <p className="text-xs text-gray-500"></p>
            <input
              minLength={13}
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Password"
            />
            <span className="text-red-500">
              {errors?.password?.message as any}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              <b>Confirm new password</b>
            </label>
            <p className="text-xs text-gray-500"></p>
            <input
              minLength={13}
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === getValues("password") ||
                  "The passwords do not match",
                required: "Confirm password is required",
              })}
              className="border border-gray-300 rounded-md px-[6px] py-[12px]"
              placeholder="Confirm Password"
            />
            <span className="text-red-500">
              {errors?.passwordConfirm?.message as any}
            </span>
          </div>

          <button
            type="submit"
            className="bg-[#032974] text-white px-[6px] py-[12px] rounded-md"
          >
            Submit{" "}
            {resetPasswordLoading && <span className="animate-spin">...</span>}
          </button>

          {resetPasswordSuccess && (
            <div>
              <p className="text-green-500">Password reset successfully</p>
              <p className="text-green-500">
                Go to login page and sing in to your account
              </p>
            </div>
          )}

          {resetPasswordError &&
            ("status" in resetPasswordError ? (
              <div>
                <div>
                  {passwordResetErrorMemo?.data &&
                    Object.keys(passwordResetErrorMemo.data).map((key) => {
                      return (
                        <p key={key} className="text-red-500">
                          {passwordResetErrorMemo.data[key]}
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
