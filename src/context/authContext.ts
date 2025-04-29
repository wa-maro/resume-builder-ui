import { createContext, useContext } from "react";

type AuthContextProps = {
  user?: UserType;
  register: (data: RegisterType) => Promise<void>;
  login: (data: LoginType) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default AuthContext;
