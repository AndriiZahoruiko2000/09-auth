"use client";

import { NewNote, NoteTag } from "@/types/note";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNoteStore } from "@/lib/store/noteStore";

import { useRouter } from "next/navigation";
import { createNote } from "@/lib/api/clientApi";

const NoteForm = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const draft = useNoteStore((s) => s.draft);
  const setDraft = useNoteStore((s) => s.setDraft);
  const clearDraft = useNoteStore((s) => s.clearDraft);

  const noteMutation = useMutation({
    mutationFn: (body: NewNote) => createNote(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchNotes"],
      });
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleClick = () => {
    router.back();
  };

  const handleSubmit = (formData: FormData) => {
    const noteData = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };

    noteMutation.mutate(noteData);
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={draft.title}
          onChange={(e) => {
            setDraft({ ...draft, title: e.target.value });
          }}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          className={css.textarea}
          value={draft.content}
          onChange={(e) => {
            setDraft({ ...draft, content: e.target.value });
          }}
        ></textarea>
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) => {
            setDraft({ ...draft, tag: e.target.value as NoteTag });
          }}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleClick}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={false}>
          Create note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
