import { useState, useEffect, useCallback } from "react";
import type { RegisteredUser } from "../types";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const user = sessionStorage.getItem("user");
    const password = sessionStorage.getItem("password");

    if (!user || !password) return false;

    const stored = localStorage.getItem("users");
    const users: RegisteredUser[] = stored ? JSON.parse(stored) : [];

    return users.some((u) => u.username === user && u.password === password);
  });

  // Re-check auth when storage changes (e.g. another tab)
  useEffect(() => {
    const handleStorageChange = () => {
      const user = sessionStorage.getItem("user");
      const password = sessionStorage.getItem("password");

      if (!user || !password) {
        setIsAuthenticated(false);
        return;
      }

      const stored = localStorage.getItem("users");
      const users: RegisteredUser[] = stored ? JSON.parse(stored) : [];
      setIsAuthenticated(
        users.some((u) => u.username === user && u.password === password)
      );
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Clear session storage when the page/tab is closed
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("password");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const login = useCallback(
    (username: string, password: string): RegisteredUser | null => {
      const stored = localStorage.getItem("users");
      const users: RegisteredUser[] = stored ? JSON.parse(stored) : [];

      const foundUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (!foundUser) return null;

      sessionStorage.setItem("user", username);
      sessionStorage.setItem("password", password);
      setIsAuthenticated(true);

      return foundUser;
    },
    []
  );

  const logout = useCallback(() => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("password");
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
