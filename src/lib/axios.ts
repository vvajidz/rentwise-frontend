// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // from your .env
  withCredentials: true, // so cookies (session, etc.) work
});



export default api;
