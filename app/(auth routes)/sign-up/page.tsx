"use client";

import { register } from "@/lib/api/clientApi";
import css from "./Page.module.css";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const Page = () => {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (formData: FormData) => {
    const userData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const response = await register(userData);
    console.log(response);
    setUser(response);
    router.push("/profile");
  };

  return (
    <div className={css["page"]}>
      <main className={css.mainContent}>
        <h1 className={css.formTitle}>Sign up</h1>
        <form className={css.form} action={handleSubmit}>
          <div className={css.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className={css.input}
              required
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className={css.input}
              required
            />
          </div>

          <div className={css.actions}>
            <button type="submit" className={css.submitButton}>
              Register
            </button>
          </div>

          <p className={css.error}>Error</p>
        </form>
      </main>
    </div>
  );
};

export default Page;
