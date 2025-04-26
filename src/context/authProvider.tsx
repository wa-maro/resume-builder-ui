import { ReactNode, useEffect, useState } from "react";
import AuthContext from "./authContext";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const register = async ({
    username,
    email,
    password,
    confirmPassword,
  }: RegisterType) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v0/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Registration failed");

      return data;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message || "Registration failed");
      else throw new Error("Registration failed");
    }
  };

  const login = async ({ usernameOrEmail, password }: LoginType) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/v0/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Login failed");

      setUser(data.user);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message || "Login failed");
      else throw new Error("Login failed");
    }
  };

  const logout = async () => {
    try {
      setUser(undefined);
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message || "Logout failed");
      else throw new Error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
