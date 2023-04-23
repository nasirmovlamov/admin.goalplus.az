import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const Navigate = (props: Props) => {
  const userJwt = useAppSelector((state) => state.auth.jwt);
  const router = useRouter();
  const [status, setStatus] = React.useState<any>("loading");

  useEffect(() => {
    if (
      localStorage.getItem("accessToken") &&
      localStorage.getItem("refreshToken")
    ) {
      setStatus("success");
    } else {
      router.push("/login");
      setStatus("failed");
    }
  }, [userJwt]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "success") {
    return <>{props.children}</>;
  }
  return null;
};

export default Navigate;
