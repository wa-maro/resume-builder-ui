import { Link } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";

const Resume = () => {
  const { resumeId } = { resumeId: null };

  return (
    <div className="px-4 min-h-[440px] space-y-6">
      <ProgressBar />

      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left">
        {resumeId ? "Continue Editing Your Resume" : "Start a New Resume"}
      </h1>

      <div className="flex justify-center sm:justify-start">
        <Link
          to={resumeId ? "work-experiences" : "personal-information"}
          className="px-4 py-2 sm:px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-base sm:text-lg font-medium shadow-md transition"
        >
          {resumeId ? "Continue" : "Create a New Resume"}
        </Link>
      </div>
    </div>
  );
};

export default Resume;
