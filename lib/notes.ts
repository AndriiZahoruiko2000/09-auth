import { GetNotesParams, GetNotesResponse, NewNote, Note } from "@/types/note";
import { serverAPI } from "./api";

export async function getNotes(userParams: GetNotesParams) {
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
