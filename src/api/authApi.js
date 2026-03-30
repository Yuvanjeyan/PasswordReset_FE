import axios from "axios";

const API = axios.create({
  baseURL: "https://passwordreset-be-4shg.onrender.com/api/auth",
});

export const forgotPassword = (email) =>
  API.post("/forgot-password", { email });

export const verifyToken = (token) =>
  API.get(`/verify/${token}`);

export const resetPassword = (token, password) =>
  API.post(`/reset-password/${token}`, { password });
