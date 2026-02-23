import { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 notes",
  description: "not found any notes",
  openGraph: {
    title: "404 notes",
    description: "not found",
    url: "https://08-zustand-flax-nu.vercel.app/",
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
    <div className={css["page"]}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default Page;
