"use client";

import { axiosInstance } from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux//userslice";
import { useEffect } from "react";
import { RootState } from "@/redux/store";

interface User {
  token: string;
}
const useAxios = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.user as User);

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (response) => response,
      (err) => {
        if (err?.response.status === 401) {
          localStorage.removeItem("event-storage");

          dispatch(logoutAction());
        }

        return Promise.reject(err);
      },
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [token, dispatch]);

  return { axiosInstance };
};

export default useAxios;
