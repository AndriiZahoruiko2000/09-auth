import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./Page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "create note",
  description: "page for creating notes",
  openGraph: {
    title: "create note",
    description: "page for creating notes",
    url: "https://08-zustand-flax-nu.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "notes",
      },
    ],
    type: "website",
  },
};

const Page = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default Page;
