import { UpdateUserBody, User } from "@/types/user";
import { serverAPI } from "./api";

export const getMe = async () => {
  const response = await serverAPI.get<User>("/users/me");
  return response.data;
};

export const updateUser = async (body: UpdateUserBody) => {
  const response = await serverAPI.patch("/users/me", body);
  return response.data;
};
