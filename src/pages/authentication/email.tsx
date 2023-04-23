import { authApi } from "@/store/authApi";
import { useRouter } from "next/router";
import React, { useEffect, useMemo } from "react";

type Props = {};

export default function EmailConfirmation() {
  const router = useRouter();
  const [
    emailConfirmationApi,
    {
      data: emailConfirmationData,
      error: emailConfirmationError,
      isLoading: emailConfirmationIsLoading,
      isError: isEmailConfirmationError,
      isSuccess: emailConfirmationIsSuccess,
    },
  ] = authApi.useEmailConfirmationMutation();
  useEffect(() => {
    const params = router.query;
    if (params.Token && params.Email) {
      console.log(params);
      const urlEncodeToken = encodeURIComponent(params.Token as string);
      console.log(urlEncodeToken);
      emailConfirmationApi({
        token: urlEncodeToken as string,
        email: params.Email as string,
      });
    }
  }, [router]);

  const errorData = useMemo(() => {
    if (isEmailConfirmationError) {
      return emailConfirmationError as any;
    }
    return null;
  }, [isEmailConfirmationError, emailConfirmationError]);

  return (
    <div className="mx-auto max-w-[1140px] pt-5 text-center flex flex-col justify-center">
      <h1 className="text-center">Email confirmation</h1>
      {emailConfirmationIsLoading && <p>Loading...</p>}
      {emailConfirmationIsSuccess && (
        <p className="text-green-500">You are confirmed</p>
      )}
      {emailConfirmationError && <p>Error</p>}
      {emailConfirmationError &&
        ("status" in emailConfirmationError ? (
          <div>
            <div>
              {errorData?.data &&
                Object.keys(errorData.data).map((key) => {
                  return (
                    <p key={key} className="text-red-500">
                      {errorData.data[key]}
                    </p>
                  );
                })}
            </div>
          </div>
        ) : null)}
    </div>
  );
}
