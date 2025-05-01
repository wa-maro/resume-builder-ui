import ProgressBar from "../components/ProgressBar";
import { useState } from "react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import SectionDivider from "../components/SectionDivider";
import ActionButton from "../components/ActionButton";
import { ArrowRight, Plus } from "lucide-react";

interface Resume {
  title: string;
  summary: string;
}

const initialResume: Resume = {
  title: "",
  summary: "",
};

const Resume = () => {
  const { resumeId } = { resumeId: null };
  const [resume, setResume] = useState<Resume>(initialResume);

  function onChangeHandler(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    setResume({ ...resume, [e.target.name]: e.target.value });
  }

  function onSubmitHandler(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setResume(initialResume);
  }

  return (
    <>
      <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-center sm:text-left mb-3">
        Welcome, John!
      </h1>

      {!resumeId ? (
        <form onSubmit={onSubmitHandler} className="pb-6">
          <SectionDivider title="Professional Summary" />

          <div className="flex flex-col gap-1 mb-4 lg:max-w-sm">
            <Label text="Title" htmlFor="title" />
            <TextInput
              name="title"
              placeholder="e.g. Software Engineer"
              value={resume.title}
              onChange={onChangeHandler}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text="Description" htmlFor="summary" />
            <TextArea
              name="summary"
              required
              placeholder="Briefly summarize your background, skills, and goals."
              value={resume.summary}
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

          <div className="bg-gray-100 p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold">{resume.title}</h2>
            <p className="text-gray-700 mt-2">{resume.summary}</p>
          </div>

          <ActionButton
            text="Continue"
            theme="bg-slate-700 hover:bg-slate-600"
            icon={<ArrowRight size={16} />}
          />
        </div>
      )}
    </>
  );
};

export default Resume;
