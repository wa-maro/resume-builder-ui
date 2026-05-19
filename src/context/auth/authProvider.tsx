import { useState } from "react";
import AuthContext from "./authContext";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

type LoginResponseType = {
  success: boolean;
  message: string;
  user?: UserType;
  token?: string;
};

function getFromStorage() {
  const token = localStorage.getItem("token");
  const localUser = localStorage.getItem("user");
  const user: UserType = localUser && JSON.parse(localUser);

  if (user && token) return user;
  return undefined;
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | undefined>(getFromStorage());

  // Users can register
  const register = async ({
    username,
    email,
    password,
    confirmPassword,
  }: RegisterType) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          confirmPassword,
          role: "user",
        }),
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

  // Both users & admins login
  const login = async ({ usernameOrEmail, password }: LoginType) => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Network response was not ok");
      }

      const { message, success, token, user }: LoginResponseType =
        await res.json();

      if (!success) throw new Error(message || "Login failed");

      if (!token || !user) {
        throw new Error("Login failed: missing user or token");
      }

      const cleanUser = { ...user, role: user.role || "user" };
      setUser(cleanUser);
      localStorage.setItem("user", JSON.stringify(cleanUser));
      localStorage.setItem("token", token);

      return cleanUser;
    } catch (error) {
      if (error instanceof Error)
        throw new Error(error.message || "Login failed");
      else throw new Error("Login failed");
    }
  };

  const logout = () => {
    setUser(undefined);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
