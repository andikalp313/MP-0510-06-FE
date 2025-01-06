"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/userSlice";

import { PropsWithChildren, useEffect, useState } from "react";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const storeData = localStorage.getItem("exploretix-storage");
    if (storeData) {
      dispatch(loginAction(JSON.parse(storeData)));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [dispatch]);

  if (isloading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
