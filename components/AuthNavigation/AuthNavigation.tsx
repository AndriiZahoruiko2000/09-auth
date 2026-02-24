"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";

import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const AuthNavigation = () => {
  const isAuth = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  const handleLogout = async () => {
    const response = await logout();
    router.push("/sign-in");
  };

  return (
    <>
      {isAuth && (
        <>
          {" "}
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>
          <li className={css.navigationItem}>
            <p className={css.userEmail}>User email</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </li>
        </>
      )}
      {!isAuth && (
        <>
          {" "}
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
};

export default AuthNavigation;
