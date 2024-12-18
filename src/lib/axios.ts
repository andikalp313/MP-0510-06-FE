import axios from "axios";
export const axiosInstamce = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
});
