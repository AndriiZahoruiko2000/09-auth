import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { Metadata } from "next";
import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api/serverApi";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const { slug } = await params;

  const tag = slug[0];

  return {
    title: `filtered notes by ${tag}`,
    description: `There are notes filtered by tag:${tag}`,
    openGraph: {
      title: `filtered notes by ${tag}`,
      description: `There are notes filtered by tag:${tag}`,
      url: `https://08-zustand-flax-nu.vercel.app/notes/filter/${tag}`,
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
};

const Page = async ({ params }: PageProps) => {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const tag = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["fetchNotes", 1, tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: "",
        tag: tag === "all" ? undefined : tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient filterTag={tag} />
    </HydrationBoundary>
  );
};

export default Page;
