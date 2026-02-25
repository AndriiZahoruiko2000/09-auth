import Link from "next/link";
import css from "./Page.module.css";
import { Metadata } from "next";

import { getMe } from "@/lib/api/serverApi";
import Image from "next/image";

export const generateMetadata = async (): Promise<Metadata> => {
  const currentUser = await getMe();
  return {
    title: `infor about user: ${currentUser.username}`,
    description: `here u can see email ${currentUser.email}`,
    openGraph: {
      title: `infor about user: ${currentUser.username}`,
      description: `here u can see email ${currentUser.email}`,
    },
  };
};

const Page = async () => {
  const currentUser = await getMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={currentUser.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {currentUser.username}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Page;
