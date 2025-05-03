import { Plus } from "lucide-react";
import ActionButton from "../components/ActionButton";
import Label from "../components/Label";
import TextInput from "../components/TextInput";
import { useState } from "react";
import FileInput from "../components/FileInput";

const newProfession: Profession = {
  award: "",
  institution: { name: "", location: "" },
  startYear: "",
  endYear: "",
  uploadedCertificate: "",
  uploadedTranscript: "",
  grade: { classification: "", gpa: "" },
};

const ProfessionForm = ({
  professions,
  setProfessions,
}: {
  professions: Profession[];
  setProfessions: React.Dispatch<React.SetStateAction<Profession[]>>;
}) => {
  const [profession, setProfession] = useState<Profession>(newProfession);

  const onChangeHandler = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfession({ ...profession, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // set resume ID
    profession.resumeId = "";

    setProfessions([...professions, profession]);
    setProfession(newProfession);
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
            value={profession.award}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="institution name" htmlFor="institutionName" />
          <TextInput
            name="institutionName"
            placeholder="University of Dodoma"
            value={profession.institution.name}
            onChange={(e) =>
              setProfession({
                ...profession,
                institution: {
                  ...profession.institution,
                  name: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="institution location" htmlFor="institutionLocation" />
          <TextInput
            name="institutionLocation"
            placeholder="Mbinga, Tanzania"
            value={profession.institution.location}
            onChange={(e) =>
              setProfession({
                ...profession,
                institution: {
                  ...profession.institution,
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
              value={profession.startYear}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text="End Year" htmlFor="endYear" />
            <TextInput
              name="endYear"
              placeholder="Nov 2010"
              onChange={onChangeHandler}
              value={profession.endYear}
            />
          </div>
        </div>

        <div className="flex gap-x-8">
          <div className="flex flex-col gap-1">
            <Label text="Grade (Classification)" htmlFor="classification" />
            <TextInput
              name="classification"
              placeholder="Lower second"
              value={profession.grade.classification}
              onChange={(e) =>
                setProfession({
                  ...profession,
                  grade: {
                    ...profession.grade,
                    classification: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text="Grade (GPA)" htmlFor="gpa" />
            <TextInput
              name="gpa"
              placeholder="3.4"
              value={profession.grade.gpa}
              onChange={(e) =>
                setProfession({
                  ...profession,
                  grade: { ...profession.grade, gpa: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 md:gap-6 mt-5">
        <div className="flex flex-col gap-1 col-span-1">
          <Label text="Certificate" htmlFor="uploadedCertificate" />
          <FileInput
            name="uploadedCertificate"
            onChange={onChangeHandler}
            value={profession.uploadedCertificate}
          />
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <Label text="Transcript" htmlFor="uploadedTranscript" />
          <FileInput
            name="uploadedTranscript"
            onChange={onChangeHandler}
            value={profession.uploadedTranscript}
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

export default ProfessionForm;
