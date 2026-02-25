import { AuthBody, RefreshResponse } from "@/types/auth";

import { User } from "@/types/user";

import { GetNotesParams, GetNotesResponse, NewNote, Note } from "@/types/note";
import { serverAPI } from "./api";
export interface UpdateUserBody {
  email?: string;
  username: string;
}

export async function fetchNotes(userParams: GetNotesParams) {
  const params: GetNotesParams = {
    perPage: 12,
    ...userParams,
  };

  const res = await serverAPI.get<GetNotesResponse>("/notes", { params });
  return res.data;
}

export async function createNote(body: NewNote) {
  const res = await serverAPI.post<Note>("/notes", body);
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await serverAPI.get<Note>(`/notes/${id}`);
  return res.data;
}

export async function deleteNoteById(id: string) {
  const res = await serverAPI.delete<Note>(`/notes/${id}`);
  return res.data;
}

export async function updateNoteById(id: string, body: NewNote) {
  const res = await serverAPI.patch<Note>(`/notes/${id}`, body);
  return res.data;
}

export const register = async (body: AuthBody) => {
  const response = await serverAPI.post<User>("/auth/register", body);
  return response.data;
};

export const login = async (body: AuthBody) => {
  const response = await serverAPI.post<User>("/auth/login", body);
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

export async function getMe() {
  const response = await serverAPI.get("/users/me");
  return response.data;
}

export async function updateUser(body: UpdateUserBody) {
  const response = await serverAPI.patch<User>("/users/me", body);
  return response.data;
}
