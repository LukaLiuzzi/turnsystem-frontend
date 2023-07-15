import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_API_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
})
