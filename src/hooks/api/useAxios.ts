"use client";

import { axiosInstance } from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userslice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

const useAxios = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization =
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM0ODUwNzQyLCJleHAiOjE3MzQ4NTc5NDJ9.4bXTdTLj8Kszk6KHpUPEndUCqBtQQZmjD1k6xdirJBk";
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
          localStorage.removeItem("Event-storage");
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
