import ActionButton from "../components/ActionButton";
import { Plus } from "lucide-react";
import TextInput from "../components/TextInput";
import Select from "../components/Select";
import Label from "../components/Label";
import { useState } from "react";

const newAcademic: Academic = {
  award: "",
  school: { name: "", location: "" },
  startYear: "",
  endYear: "",
  grade: { division: "", points: "" },
  uploadedCertificate: "",
};

const AcademicForm = ({
  academics,
  setAcademics,
}: {
  academics: Academic[];
  setAcademics: React.Dispatch<React.SetStateAction<Academic[]>>;
}) => {
  const [academic, setAcademic] = useState<Academic>(newAcademic);

  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setAcademic({ ...academic, [ev.target.name]: ev.target.value });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
          <Select
            label="Select Award"
            name="award"
            onChange={onChangeHandler}
            value={academic.award}
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
          <Label text="school name" htmlFor="schoolName" />
          <TextInput
            name="schoolName"
            placeholder="Kipololo Secondary School"
            value={academic.school.name}
            onChange={(e) =>
              setAcademic({
                ...academic,
                school: { ...academic.school, name: e.target.value },
              })
            }
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text="school location" htmlFor="schoolLocation" />
          <TextInput
            name="schoolLocation"
            placeholder="Mbinga, Tanzania"
            value={academic.school.location}
            onChange={(e) =>
              setAcademic({
                ...academic,
                school: {
                  ...academic.school,
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
            <Label text="Grade (Division)" htmlFor="division" />
            <TextInput
              name="division"
              placeholder="III"
              value={academic.grade.division}
              onChange={(e) =>
                setAcademic({
                  ...academic,
                  grade: { ...academic.grade, division: e.target.value },
                })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text="Grade (Points)" htmlFor="points" />
            <TextInput
              name="points"
              placeholder="24"
              value={academic.grade.points}
              onChange={(e) =>
                setAcademic({
                  ...academic,
                  grade: { ...academic.grade, points: e.target.value },
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
          value={academic.uploadedCertificate}
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

export default AcademicForm;
