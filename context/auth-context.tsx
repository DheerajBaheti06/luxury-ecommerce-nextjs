"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated on initial load
    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(() => {
    const cookies = document.cookie.split(";");
    const sessionCookie = cookies.find((cookie) =>
      cookie.trim().startsWith("user-session=")
    );

    if (sessionCookie && sessionCookie.includes("authenticated")) {
      setIsAuthenticated(true);
      // In a real app, you would fetch user data here
      setUser({ name: "John Doe", email: "john.doe@example.com" } as any);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          if (email && password) {
            // Set a cookie that expires in 7 days
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            document.cookie = `user-session=authenticated; path=/; expires=${expiryDate.toUTCString()}`;

            setIsAuthenticated(true);
            setUser({ name: "John Doe", email } as any);
            resolve(true);
          } else {
            resolve(false);
          }
        }, 1000);
      });
    },
    []
  );

  const signup = useCallback(
    async (name: string, email: string, password: string): Promise<boolean> => {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          if (name && email && password && password.length >= 6) {
            // Set a cookie that expires in 7 days
            const expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            document.cookie = `user-session=authenticated; path=/; expires=${expiryDate.toUTCString()}`;

            setIsAuthenticated(true);
            setUser({ name, email } as any);
            resolve(true);
          } else {
            resolve(false);
          }
        }, 1000);
      });
    },
    []
  );

  const logout = useCallback(() => {
    document.cookie =
      "user-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      login,
      signup,
      logout,
    }),
    [isAuthenticated, user, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
