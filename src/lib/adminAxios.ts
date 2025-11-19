// lib/axios.ts
import axios from "axios";

const axiosAd = axios.create({
  baseURL: "https://rentwise-backend-1-1ffp.onrender.com/", // from your .env
  withCredentials: true, // so cookies (session, etc.) work
});



export default axiosAd;
