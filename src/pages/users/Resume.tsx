import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../context/auth/authContext";
import { useResume } from "../../context/resume/ResumeContext";
import SectionDivider from "../../components/SectionDivider";
import ResumeForm from "../../features/ResumeForm";
import { useTranslation } from "react-i18next";
import Spinner from "../../components/ui/Spinner";

const initialForm: Resume = {
  title: "",
  summary: "",
};

const Resume = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { resume, createResume, updateResume, loading } = useResume();
  const [formData, setFormData] = useState<Resume>(initialForm);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (resume && isEditing) {
      setFormData({ title: resume.title, summary: resume.summary });
    }
  }, [resume, isEditing]);

  function onChangeHandler(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!user) return;

    if (resume?._id) {
      updateResume(resume._id, formData);
    } else {
      createResume(formData);
    }

    setIsEditing(false);
  }

  const onNextHandler = async () => await navigate("personal-information");

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left mb-3">
        {t("welcome", { username: user?.username || "" })}
      </h1>

      <SectionDivider title={t("resume_summary")} />

      {isEditing || !resume ? (
        <ResumeForm
          formData={formData}
          onChangeHandler={onChangeHandler}
          onSubmitHandler={onSubmitHandler}
          isUpdate={!!resume?._id}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="flex gap-6 flex-wrap flex-col justify-between min-h-[57vh]">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {t(`${resume.title}`)}
            </h2>
            <p className="text-gray-600 leading-relaxed">{resume.summary}</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center font-medium bg-yellow-500 hover:bg-yellow-400 text-gray-800 text-nowrap cursor-pointer px-3.5 py-1.5 gap-x-2 rounded"
            >
              <span className="capitalize">{t("edit")}</span>
            </button>

            <button
              type="button"
              onClick={onNextHandler}
              className="flex items-center font-medium bg-slate-700 hover:bg-slate-600 text-gray-200 text-nowrap cursor-pointer px-3.5 py-1.5 gap-x-2 rounded"
            >
              <span className="capitalize">{t("personal_information")}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
