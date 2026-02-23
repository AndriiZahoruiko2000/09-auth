import { AuthBody, RefreshResponse } from "@/types/auth";
import { serverAPI } from "./api";
import { User } from "@/types/user";

export const register = async (body: AuthBody) => {
  const response = await serverAPI.post<User>("/auth/register", body);
  return response.data;
};

export const login = async (body: AuthBody) => {
  const response = await serverAPI.post<User>("/auth/register", body);
  return response.data;
};

export const logout = async () => {
  const response = await serverAPI.post("/auth/logout");
  return response.data;
};

export const refresh = async () => {
  const response = await serverAPI.get<RefreshResponse>("/auth/session");
  return response.data;
};
