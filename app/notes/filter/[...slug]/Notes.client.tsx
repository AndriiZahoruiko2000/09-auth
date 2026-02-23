"use client";
import css from "./NotesPage.module.css";
import { useEffect, useState } from "react";

import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";

import NoteList from "@/components/NoteList/NoteList";

import { Note } from "@/types/note";
import Link from "next/link";

interface NotesClientProps {
  filterTag: string;
}

const NotesClient = ({ filterTag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPage(1);
  }, [search]);

  const [query] = useDebounce(search, 1000);

  const noteQuery = useQuery({
    queryKey: ["getNotes", page, query, filterTag],
    queryFn: () =>
      getNotes({
        page,
        search: query,
        tag: filterTag === "all" ? undefined : filterTag,
      }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const notesList: Note[] = noteQuery.data?.notes || [];
  const totalPages: number = noteQuery.data?.totalPages ?? 0;
  const loading = noteQuery.isLoading;
  const isError = noteQuery.isError;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} setSearch={setSearch} />
        {totalPages > 1 && (
          <Pagination totalPages={totalPages} setPage={setPage} page={page} />
        )}
        <Link className={css.button} href="/notes/action/create">
          Create note +
        </Link>
      </header>
      <main>{notesList.length > 0 && <NoteList notesList={notesList} />}</main>
      {/* {loading && <Loader />}
      {isError && <ErrorMessage error={noteQuery.error} />} */}
    </div>
  );
};

export default NotesClient;
