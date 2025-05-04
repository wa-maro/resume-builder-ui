import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useResume } from "./resume/ResumeContext";
import Spinner from "../components/Spinner";

const ResumeSectionGuard = () => {
  const { resume, loading } = useResume();
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!resume && !loading) navigate("/resume");
    }, 100);

    return () => clearTimeout(timeout);
  }, [resume, loading, navigate]);

  if (loading) return <Spinner />;

  return <Outlet />;
};

export default ResumeSectionGuard;
