"use client";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./Page.module.css";
import { updateUser } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const user = useAuthStore((s) => s.user);
  const userName = user?.username;
  const setUser = useAuthStore((s) => s.setUser);
  const router = useRouter();

  const handleClick = () => {
    router.push("/profile");
  };

  const handleSubmit = async (formData: FormData) => {
    const inputUserName = formData.get("username") as string;

    // console.log(Object.fromEntries(formData.entries()));

    const response = await updateUser({
      username: inputUserName,
      email: user?.email,
    });
    setUser(response);
    router.push("/profile");
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        {user?.avatar && (
          <Image
            src={user?.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        )}

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              name="username"
              className={css.input}
              defaultValue={userName}
            />
          </div>

          <p>Email: {user?.email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleClick}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
