import ProgressBar from "../components/ProgressBar";
import { useEffect, useState } from "react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import SectionDivider from "../components/SectionDivider";
import ActionButton from "../components/ActionButton";
import { ArrowRight, Plus } from "lucide-react";
import { useAuth } from "../context/auth/authContext";
import { useResume } from "../context/resume/ResumeContext";
import { useNavigate } from "react-router-dom";

interface Resume {
  title: string;
  summary: string;
}

const initialForm: Resume = {
  title: "",
  summary: "",
};

const Resume = () => {
  const { user } = useAuth();
  const { resume, createResume, getResume } = useResume();
  const [formData, setFormData] = useState<Resume>(initialForm);
  const navigate = useNavigate();

  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (!user) return;
  }

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!user) return;

    createResume(formData);
    setFormData(initialForm);
  }

  const onNextHandler = (): void => {
    navigate("personal-information");
  };

  useEffect(() => {
    if (!resume) {
      (async () => {
        await getResume();
      })();
    }
  }, [resume, getResume]);

  return (
    <>
      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left mb-3">
        Welcome, {user && `${user.username}!`}
      </h1>

      {!resume ? (
        <form onSubmit={onSubmitHandler} className="pb-6">
          <SectionDivider title="Professional Summary" />

          <div className="flex flex-col gap-1 mb-4 lg:max-w-sm">
            <Label text="Title" htmlFor="title" />
            <TextInput
              name="title"
              placeholder="e.g. Software Engineer"
              value={formData.title}
              onChange={onChangeHandler}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text="Description" htmlFor="summary" />
            <TextArea
              name="summary"
              required
              placeholder="Briefly summarize your background, skills, and goals."
              value={formData.summary}
              onChange={onChangeHandler}
            />
          </div>

          <ActionButton
            text="Create Resume"
            theme="bg-slate-700 hover:bg-slate-600"
            icon={<Plus size={16} />}
          />
        </form>
      ) : (
        <div className="space-y-6">
          <ProgressBar />

          <SectionDivider title="Professional Summary" />

          <div className="px-6 flex gap-6 flex-wrap flex-col max-w-5xl">
            <div className="md:max-w-lg space-y-2">
              <h2 className="text-xl font-semibold">{resume.title}</h2>
              <p className="text-gray-700">{resume.summary}</p>
            </div>

            <div className="flex">
              <button
                type="button"
                onClick={onNextHandler}
                className="flex items-center font-medium bg-slate-700 hover:bg-slate-600 text-gray-200 text-nowrap cursor-pointer px-3.5 py-1.5 gap-x-2 rounded-e"
              >
                <span className="capitalize">Continue</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Resume;
