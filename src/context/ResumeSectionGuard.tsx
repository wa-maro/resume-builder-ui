import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ResumeSectionGuard = () => {
  const navigate = useNavigate();
  const resume = null;

  useEffect(() => {
    if (!resume) navigate("/resume");
  }, [resume, navigate]);

  if (!resume) return null;

  return <Outlet />;
};

export default ResumeSectionGuard;
