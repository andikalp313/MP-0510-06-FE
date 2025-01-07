"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FC, PropsWithChildren, useEffect } from "react";

import { jwtDecode } from "jwt-decode";
import { fromUnixTime, isAfter } from "date-fns";
import { logoutAction } from "@/redux/slices/userSlice";

const TokenProvider: FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    const checkTokenValidity = () => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const tokenExpired = fromUnixTime(decodedToken.exp!);

          if (isAfter(new Date(), tokenExpired)) {
            localStorage.removeItem("blog-storage");
            dispatch(logoutAction());
          }
        } catch (error) {
          localStorage.removeItem("blog-storage");
          dispatch(logoutAction());
        }
      }
    };
    const interval = setInterval(checkTokenValidity, 15000);

    return () => clearInterval(interval);
  }, [token, dispatch]);

  return <>{children}</>;
};

export default TokenProvider;
