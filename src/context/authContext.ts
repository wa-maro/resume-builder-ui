import { createContext, useContext } from "react";

type AuthContextProps = {
  user?: UserType;
  register: (data: RegisterType) => Promise<void>;
};

const initialContext = {
  user: undefined,
  register: async () => {},
};

const AuthContext = createContext<AuthContextProps>(initialContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export default AuthContext;
