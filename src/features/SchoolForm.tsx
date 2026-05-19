import { useState, useEffect } from "react";
import ActionButton from "../components/ui/ActionButton";
import { Plus } from "lucide-react";
import Select from "../components/form/Select";
import Label from "../components/form/Label";
import FileInput from "../components/form/FileInput";
import TextInput from "../components/form/TextInput";
import { useTranslation } from "react-i18next";

const defaultSchool: School = {
  level: "",
  award: "",
  school: { name: "", location: "" },
  startYear: "",
  endYear: "",
  grade: { division: "", points: "" },
  resume: "",
  certificate: "",
};

interface SchoolFormProps {
  schools: School[];
  setSchools: React.Dispatch<React.SetStateAction<School[]>>;
  editing?: School | null;
  setEditing?: React.Dispatch<React.SetStateAction<School | null>>;
  onSave?: (school: School) => void;
}

const SchoolForm = ({
  schools,
  setSchools,
  editing,
  setEditing,
  onSave,
}: SchoolFormProps) => {
  const { t } = useTranslation();
  const [school, setSchool] = useState<School>(defaultSchool);

  // Prefill form when editing
  useEffect(() => {
    if (editing) setSchool(editing);
    else setSchool(defaultSchool);
  }, [editing]);

  const onFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) setSchool({ ...school, certificate: file });
  };

  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = ev.target;
    setSchool((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (onSave) {
      onSave(school);
    } else {
      if (editing) {
        setSchools((prev) =>
          prev.map((s) => (s._id === school._id ? school : s))
        );
        setEditing?.(null);
      } else {
        setSchools([...schools, school]);
      }
    }

    setSchool(defaultSchool);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-5 gap-3 gap-x-5">
        <div className="flex flex-col gap-1 col-span-1">
          <Label text={t("level")} htmlFor="level" />
          <Select
            label={t("select_level")}
            name="level"
            value={school.level}
            onChange={onChangeHandler}
          >
            <option value="Primary">{t("primary")}</option>
            <option value="O-Level">{t("o_level")}</option>
            <option value="A-Level">{t("a_level")}</option>
          </Select>
        </div>

        <div className="flex flex-col gap-1 col-span-2">
          <Label text={t("school_name")} htmlFor="schoolName" />
          <TextInput
            name="schoolName"
            value={school.school.name}
            onChange={(e) =>
              setSchool({
                ...school,
                school: { ...school.school, name: e.target.value },
              })
            }
          />
        </div>

        <div className="flex flex-col gap-1 col-span-2">
          <Label text={t("school_location")} htmlFor="schoolLocation" />
          <TextInput
            name="schoolLocation"
            value={school.school.location}
            onChange={(e) =>
              setSchool({
                ...school,
                school: { ...school.school, location: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 gap-x-5 mt-5">
        <div className="flex flex-col gap-1 col-span-1">
          <Label text={t("start_year")} htmlFor="startYear" />
          <TextInput
            name="startYear"
            value={school.startYear.toString()}
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1">
          <Label text={t("end_year")} htmlFor="endYear" />
          <TextInput
            name="endYear"
            value={school.endYear.toString()}
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex flex-col gap-1 col-span-3">
          <Label text={t("award")} htmlFor="award" />
          <Select
            label={t("select_award")}
            name="award"
            value={school.award}
            onChange={onChangeHandler}
          >
            <option value="Primary School Leaving Examination (PSLE)">
              {t("primary_school_leaving_examination")}
            </option>
            <option value="The Certificate of Secondary Education Examination (CSEE)">
              {t("certificate_of_secondary_education")}
            </option>
            <option value="Advanced Certificate of Secondary Education Examination (ACSEE)">
              {t("advanced_certificate_of_secondary_education")}
            </option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 gap-x-5 mt-5">
        <div className="flex gap-x-8">
          <div className="flex flex-col gap-1">
            <Label text={t("grade_division")} htmlFor="division" />
            <TextInput
              name="division"
              value={school.grade?.division || ""}
              onChange={(e) =>
                setSchool({
                  ...school,
                  grade: {
                    ...school.grade,
                    division: e.target.value as GradeDivision,
                  },
                })
              }
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label text={t("grade_points")} htmlFor="points" />
            <TextInput
              name="points"
              value={school.grade?.points || ""}
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

      <div className="mt-5 flex flex-col gap-1 relative">
        <Label text={t("certificate")} htmlFor="certificate" />
        <FileInput name="certificate" onChange={onFileChange} />
        <p className="text-xs text-gray-500 absolute left-0 -bottom-5">
          Only PDF
        </p>
      </div>

      <ActionButton
        text={editing ? t("update") : t("add")}
        theme="bg-violet-600"
        icon={<Plus size={16} />}
      />
    </form>
  );
};

export default SchoolForm;
