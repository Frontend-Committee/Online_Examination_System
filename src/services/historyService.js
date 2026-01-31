import axiosInstance from "../api/axiosInstance";

export const getUserHistory = () => {
  return axiosInstance.get("/questions/history");
};