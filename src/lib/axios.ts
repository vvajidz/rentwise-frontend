// lib/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://rentwise-backend-1-1ffp.onrender.com/api", 
  withCredentials: true, // so cookies (session, etc.) work
});



export default api;
