import { GetNotesParams, GetNotesResponse, Note } from "@/types/note";
import { serverAPI } from "./api";
import { cookies } from "next/headers";
import { User } from "@/types/user";

export async function fetchNoteById(id: string) {
  const cookieStore = await cookies();
  const res = await serverAPI.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function fetchNotes(userParams: GetNotesParams) {
  const cookieStore = await cookies();
  const params: GetNotesParams = {
    perPage: 12,
    ...userParams,
  };
  const res = await serverAPI.get<GetNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

export async function getMe() {
  const cookieStore = await cookies();
  const response = await serverAPI.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const response = await serverAPI.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
}
