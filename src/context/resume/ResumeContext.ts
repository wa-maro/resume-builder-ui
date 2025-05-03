import { createContext, useContext } from "react";

type ResumeContextType = {
  resume?: Resume;
  createResume: (data: Resume) => Promise<void>;
  loading: boolean;
};

const ResumeContext = createContext<ResumeContextType | null>(null);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within ResumeProvider");
  return context;
};

export default ResumeContext;
