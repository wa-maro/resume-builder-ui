import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useResume } from "./resume/ResumeContext";

const ResumeSectionGuard = () => {
  const { resume } = useResume();
  const navigate = useNavigate();

  useEffect(() => {
    if (!resume) navigate("/resume");
  }, [resume, navigate]);

  if (!resume) return null;

  return <Outlet />;
};

export default ResumeSectionGuard;
