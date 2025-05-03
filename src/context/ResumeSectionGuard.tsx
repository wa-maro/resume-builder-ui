import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useResume } from "./resume/ResumeContext";

const ResumeSectionGuard = () => {
  const { resume, loading } = useResume();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!resume && !loading) navigate("/resume");
    }, 100);

    return () => clearTimeout(timeout);
  }, [resume, loading, navigate]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-opacity-50"></div>
      </div>
    );

  return <Outlet />;
};

export default ResumeSectionGuard;
