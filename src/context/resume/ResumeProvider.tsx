import { useEffect, useState } from "react";
import ResumeContext from "./ResumeContext";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [resume, setResume] = useState<Resume | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const createResume = async (data: Resume) => {
    try {
      const res = await fetch(`${API_BASE_URL}/resume`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: data.title, summary: data.summary }),
      });

      const result: FetchResponse<Resume> = await res.json();

      if (!result.success) throw new Error(result.message);

      setResume(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Resume creation failed:", error);
    }
  };

  const getResume = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/resume`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result: FetchResponse<Resume> = await res.json();

      if (!result.success) throw new Error(result.message);

      if (result.data) {
        setResume(result.data);
      } else {
        setResume(undefined);
      }
    } catch (error) {
      console.error("Can get resume", error);
      setResume(undefined);
    } finally {
      setLoading(false);
    }
  };

  const updateResume = async (id: string, data: Partial<Resume>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/resume/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result: FetchResponse<Resume> = await res.json();

      if (!result.success) throw new Error(result.message);

      setResume(result.data);
      console.log("Resume updated:", result.data);
    } catch (error) {
      console.error("Resume update failed:", error);
    }
  };

  useEffect(() => {
    (async () => {
      await getResume();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResumeContext.Provider
      value={{ resume, createResume, updateResume, loading }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export default ResumeProvider;
