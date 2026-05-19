import { createContext, useContext } from "react";

type AuthContextProps = {
  user?: UserType;
  register: (data: RegisterType) => Promise<void>;
  login: (data: LoginType) => Promise<UserType>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default AuthContext;
