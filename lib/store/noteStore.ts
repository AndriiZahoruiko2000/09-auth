import { NewNote, Note } from "@/types/note";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface NoteStore {
  draft: NewNote;
  setDraft: (note: NewNote) => void;
  clearDraft: () => void;
}

const initialDraft: NewNote = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (setStore) => {
      return {
        draft: initialDraft,
        setDraft: (note: NewNote) => {
          setStore(() => {
            return {
              draft: note,
            };
          });
        },
        clearDraft: () => {
          setStore(() => {
            return {
              draft: initialDraft,
            };
          });
        },
      };
    },
    { name: "NoteDraft" },
  ),
);
