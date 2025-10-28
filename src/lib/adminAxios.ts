// lib/axios.ts
import axios from "axios";

const axiosAd = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_URL, // from your .env
  withCredentials: true, // so cookies (session, etc.) work
});



export default axiosAd;
