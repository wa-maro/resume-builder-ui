import ActionButton from "../components/ActionButton";
import { Plus } from "lucide-react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import Label from "../components/Label";
import { useState } from "react";

const newSchool = {
  _id: "",
  award: "",
  institution: { name: "", location: "" },
  startYear: "",
  endYear: "",
  grade: { division: "", points: "" },
  uploadedCertificate: "",
  resumeId: "",
};

const SchoolForm = ({
  schools,
  setSchools,
}: {
  schools: School[];
  setSchools: React.Dispatch<React.SetStateAction<School[]>>;
}) => {
  const [school, setSchool] = useState<School>(newSchool);

  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setSchool({ ...school, [ev.target.name]: ev.target.value });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSchools([...schools, school]);
    setSchool(newSchool);
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="flex flex-col gap-1">
          <Label text="award" htmlFor="award" />
          <Select
            label="Select Award"
            name="award"
            onChange={onChangeHandler}
            value={school.award}
          >
            <option value="PSLE">Primary Education Certificate (PSLE)</option>
            <option value="CSEE">
              Certificate of Secondary Education Examination (CSEE)
            </option>
            <option value="ACSEE">
              Advanced Certificate of Secondary Education Examination (ACSEE)
            </option>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label text="institution name" htmlFor="institutionName" />
          <TextInput
            name="institutionName"
            placeholder="Kipololo Secondary School"
            value={school.institution.name}
            onChange={(e) =>
              setSchool({
                ...school,
                institution: { ...school.institution, name: e.target.value },
              })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="institution location" htmlFor="institutionLocation" />
          <TextInput
            name="institutionLocation"
            placeholder="Mbinga, Tanzania"
            value={school.institution.location}
            onChange={(e) =>
              setSchool({
                ...school,
                institution: {
                  ...school.institution,
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
              value={school.startYear}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text="End Year" htmlFor="endYear" />
            <TextInput
              name="endYear"
              placeholder="Nov 2010"
              onChange={onChangeHandler}
              value={school.endYear}
            />
          </div>
        </div>

        <div className="flex gap-x-8">
          <div className="flex flex-col gap-1">
            <Label text="Grade (Division)" htmlFor="division" />
            <TextInput
              name="division"
              placeholder="III"
              value={school.grade.division}
              onChange={(e) =>
                setSchool({
                  ...school,
                  grade: { ...school.grade, division: e.target.value },
                })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text="Grade (Points)" htmlFor="points" />
            <TextInput
              name="points"
              placeholder="24"
              value={school.grade.points}
              onChange={(e) =>
                setSchool({
                  ...school,
                  grade: { ...school.grade, points: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1">
        <Label text="Certificate" htmlFor="uploadedCertificate" />
        <input
          className="font-medium text-sm text-gray-500 bg-gray-100 rounded max-w-fit cursor-pointer file:cursor-pointer file:border-0 file:py-1.5 file:px-2.5 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white placeholder:capitalize"
          type="file"
          name="uploadedCertificate"
          id="uploadedCertificate"
          placeholder="upload certificate"
          onChange={onChangeHandler}
          value={school.uploadedCertificate}
        />
      </div>

      <ActionButton
        text="Add"
        theme="bg-violet-600"
        icon={<Plus size={16} />}
      />
    </form>
  );
};

export default SchoolForm;
