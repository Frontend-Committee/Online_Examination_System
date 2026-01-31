import axiosInstance from "../api/axiosInstance";

export const login = (data) => {
  return axiosInstance.post("/auth/signin", data);
};

export const register = (data) => {
  return axiosInstance.post("/auth/signup", data);
};

export const forgotPassword = (email) => {
  return axiosInstance.post("/auth/forgotPassword", { email });
};
export const verifyCode = (data) => {
  return axiosInstance.post("/auth/verifyResetCode", data);
};
export const resetPassword = (data) => {
  return axiosInstance.put("/auth/resetPassword", data);
};
