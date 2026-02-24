import { User } from "@/types/user";
import { create } from "zustand";

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((setStore) => {
  return {
    user: null,
    isAuthenticated: false,
    setUser: (user) => {
      setStore(() => {
        return {
          user: user,
          isAuthenticated: true,
        };
      });
    },
    clearIsAuthenticated: () => {
      setStore(() => {
        return {
          user: null,
          isAuthenticated: false,
        };
      });
    },
  };
});
