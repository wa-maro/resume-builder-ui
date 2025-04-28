import { Plus } from "lucide-react";
import ActionButton from "../components/ActionButton";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import { useState } from "react";

const newAcademic: Academic = {
  award: "",
  institution: { name: "", location: "" },
  startYear: "",
  endYear: "",
  uploadedCertificate: "",
  uploadedTranscript: "",
  grade: { classification: "", gpa: "" },
};

const AcademicForm = ({
  academics,
  setAcademics,
}: {
  academics: Academic[];
  setAcademics: React.Dispatch<React.SetStateAction<Academic[]>>;
}) => {
  const onChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAcademic({ ...academic, [e.target.name]: e.target.value });
  };
  const [academic, setAcademic] = useState<Academic>(newAcademic);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set resume ID
    academic.resumeId = "";

    setAcademics([...academics, academic]);
    setAcademic(newAcademic);
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="flex flex-col gap-1">
          <Label text="award" htmlFor="award" />
          <TextInput
            name="award"
            placeholder="Bachelor of Science with Education"
            onChange={onChangeHandler}
            value={academic.award}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="institution name" htmlFor="institutionName" />
          <TextInput
            name="institutionName"
            placeholder="University of Dodoma"
            value={academic.institution.name}
            onChange={(e) =>
              setAcademic({
                ...academic,
                institution: { ...academic.institution, name: e.target.value },
              })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="institution location" htmlFor="institutionLocation" />
          <TextInput
            name="institutionLocation"
            placeholder="Mbinga, Tanzania"
            value={academic.institution.location}
            onChange={(e) =>
              setAcademic({
                ...academic,
                institution: {
                  ...academic.institution,
                  location: e.target.value,
                },
              })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:gap-6 mt-5">
        <div className="flex gap-x-8">
          <div className="flex flex-col gap-1">
            <Label text="Start Year" htmlFor="startYear" />
            <TextInput
              name="startYear"
              placeholder="Jan 2010"
              onChange={onChangeHandler}
              value={academic.startYear}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text="End Year" htmlFor="endYear" />
            <TextInput
              name="endYear"
              placeholder="Nov 2010"
              onChange={onChangeHandler}
              value={academic.endYear}
            />
          </div>
        </div>

        <div className="flex gap-x-8">
          <div className="flex flex-col gap-1">
            <Label text="Grade (Classification)" htmlFor="classification" />
            <TextInput
              name="classification"
              placeholder="Lower second"
              value={academic.grade.classification}
              onChange={(e) =>
                setAcademic({
                  ...academic,
                  grade: { ...academic.grade, classification: e.target.value },
                })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text="Grade (GPA)" htmlFor="gpa" />
            <TextInput
              name="gpa"
              placeholder="3.4"
              value={academic.grade.gpa}
              onChange={(e) =>
                setAcademic({
                  ...academic,
                  grade: { ...academic.grade, gpa: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 md:gap-6 mt-5">
        <div className="flex flex-col gap-1 col-span-1">
          <Label text="Certificate" htmlFor="uploadedCertificate" />
          <input
            className="font-medium text-sm text-gray-500 bg-gray-100 rounded max-w-fit cursor-pointer file:cursor-pointer file:border-0 file:py-1.5 file:px-2.5 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white placeholder:capitalize"
            type="file"
            name="uploadedCertificate"
            placeholder="upload certificate"
            onChange={onChangeHandler}
            value={academic.uploadedCertificate}
          />
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <Label text="Transcript" htmlFor="uploadedTranscript" />
          <input
            className="font-medium text-sm text-gray-500 bg-gray-100 rounded max-w-fit cursor-pointer file:cursor-pointer file:border-0 file:py-1.5 file:px-2.5 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white placeholder:capitalize"
            type="file"
            name="uploadedTranscript"
            placeholder="upload Transcript"
            onChange={onChangeHandler}
            value={academic.uploadedTranscript}
          />
        </div>
      </div>

      <ActionButton
        text="Add"
        theme="bg-violet-600"
        icon={<Plus size={16} />}
      />
    </form>
  );
};

export default AcademicForm;
