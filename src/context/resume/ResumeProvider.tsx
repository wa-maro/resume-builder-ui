import { useEffect, useState } from "react";
import ResumeContext from "./ResumeContext";

interface CreateResumeResponse {
  success: boolean;
  message: string;
  resume?: Resume;
}

const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resume, setResume] = useState<Resume | undefined>(undefined);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const createResume = async (data: Resume) => {
    try {
      const res = await fetch("http://127.0.0.1:8080/api/v0/resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: data.title, summary: data.summary }),
      });

      const result: CreateResumeResponse = await res.json();

      if (!result.success) throw new Error(result.message);

      setResume(result.resume);
    } catch (error) {
      console.error("Resume creation failed:", error);
    }
  };

  useEffect(() => {
    const getResume = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8080/api/v0/resume", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result: CreateResumeResponse = await res.json();

        if (!result.success) throw new Error(result.message);

        setResume(result.resume);
      } catch (error) {
        console.error("Can get resume", error);
      }
    };

    getResume();
  });

  return (
    <ResumeContext.Provider value={{ resume, createResume }}>
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeProvider;
