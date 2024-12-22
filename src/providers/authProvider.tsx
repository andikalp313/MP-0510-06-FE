"use client";

import LoadingScreen from "@/components/LoadingPage";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userslice";
import { PropsWithChildren, useEffect, useState } from "react";

const authProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("blog-storage");

    if (data) {
      dispatch(loginAction(JSON.parse(data)));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default authProvider;
