import { useState, useEffect, useCallback, useContext, createContext } from "react";
import type { ReactNode } from "react";
import type { RegisteredUser } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => RegisteredUser | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
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

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
