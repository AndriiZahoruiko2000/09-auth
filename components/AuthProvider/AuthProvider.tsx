"use client";
import { useAuthStore } from "@/lib/store/authStore";
import css from "./AuthProvider.module.css";
import { useEffect } from "react";

import { getMe, refresh } from "@/lib/api/clientApi";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const isAuth = useAuthStore((s) => s.isAuthenticated);
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    const updateUserSession = async () => {
      if (!isAuth) {
        const response = await refresh();
        if (response.success) {
          const currentUser = await getMe();
          if (currentUser) {
            setUser(currentUser);
          }
        }
      }
    };
    updateUserSession();
  }, []);

  return children;
};

export default AuthProvider;
