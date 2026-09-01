import { Plus } from "lucide-react";
import ActionButton from "../components/ui/ActionButton";
import Label from "../components/form/Label";
import TextInput from "../components/form/TextInput";
import { useEffect, useState } from "react";
import FileInput from "../components/form/FileInput";
import Select from "../components/form/Select";
import { useTranslation } from "react-i18next";

const defaultAcademic: Academic = {
  level: "",
  award: "",
  institution: { name: "", location: "" },
  startYear: "",
  endYear: "",
  certificate: "",
  transcript: "",
  grade: { classification: "", gpa: "" },
};

interface AcademicFormProps {
  academics: Academic[];
  setAcademics: React.Dispatch<React.SetStateAction<Academic[]>>;
  editing?: Academic | null;
  setEditing?: React.Dispatch<React.SetStateAction<Academic | null>>;
  onSave?: (school: Academic) => void;
}

const AcademicForm = ({
  academics,
  editing,
  setEditing,
  setAcademics,
  onSave,
}: AcademicFormProps) => {
  const { t } = useTranslation();
  const [academic, setAcademic] = useState<Academic>(defaultAcademic);

  // Prefill form when editing
  useEffect(() => {
    if (editing) setAcademic(editing);
    else setAcademic(defaultAcademic);
  }, [editing]);

  const onFileChange =
    (field: "certificate" | "transcript") =>
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      const file = ev.target.files?.[0];
      if (file) setAcademic((prev) => ({ ...prev, [field]: file }));
    };

  const onChangeHandler = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = ev.target;
    setAcademic((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    // Validation
    if (!academic.level) return alert("Academic level is required");
    if (!academic.award) return alert("Award is required");
    if (!academic.institution.name || !academic.institution.location)
      return alert("Institution name and location are required");

    // Convert strings to numbers
    const academicToSave: Academic = {
      ...academic,
      startYear: Number(academic.startYear),
      endYear: Number(academic.endYear),
      grade: {
        ...academic.grade,
        gpa:
          academic.grade.gpa !== "" && !isNaN(Number(academic.grade.gpa))
            ? Number(academic.grade.gpa)
            : "",
      },
      institution: {
        name: academic.institution.name.trim(),
        location: academic.institution.location.trim(),
      },
    };

    if (onSave) {
      onSave(academicToSave);
    } else {
      // Local add/edit
      if (editing) {
        setAcademics((prev) =>
          prev.map((s) => (s._id === academic._id ? academicToSave : s)),
        );
        setEditing?.(null);
      } else {
        setAcademics([...academics, academicToSave]);
      }
    }

    setAcademic(defaultAcademic);
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-5 gap-4 gap-x-6">
        <div className="flex flex-col gap-1 col-span-1">
          <Label text={t("level")} htmlFor="level" />
          <Select
            label={t("select_level")}
            name="level"
            value={academic.level}
            onChange={(e) =>
              setAcademic({
                ...academic,
                level: e.target.value as AcademicLevel,
              })
            }
          >
            <option value="Diploma">{t("diploma")}</option>
            <option value="Advanced Diploma">{t("advanced_diploma")}</option>
            <option value="Bachelor's">{t("bachelors")}</option>
            <option value="Postgraduate Diploma">
              {t("postgraduate_diploma")}
            </option>
            <option value="Master's">{t("masters")}</option>
            <option value="Doctorate (PhD)">{t("doctorate")}</option>
          </Select>
        </div>

        <div className="flex flex-col gap-1 col-span-2">
          <Label text={t("institution_name")} htmlFor="institutionName" />
          <TextInput
            name="institutionName"
            placeholder="University of Dodoma"
            value={academic.institution.name}
            onChange={(e) =>
              setAcademic({
                ...academic,
                institution: {
                  ...academic.institution,
                  name: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="flex flex-col gap-1 col-span-2">
          <Label
            text={t("institution_location")}
            htmlFor="institutionLocation"
          />
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

      <div className="grid grid-cols-5 gap-4 gap-x-6 mt-5">
        <div className="flex flex-col gap-1 col-span-1">
          <Label text={t("start_year")} htmlFor="startYear" />
          <TextInput
            name="startYear"
            placeholder="2010"
            onChange={onChangeHandler}
            value={academic.startYear.toString()}
          />
        </div>

        <div className="flex flex-col gap-1 col-span-1">
          <Label text={t("end_year")} htmlFor="endYear" />
          <TextInput
            name="endYear"
            placeholder="2014"
            onChange={onChangeHandler}
            value={academic.endYear.toString()}
          />
        </div>

        <div className="flex flex-col gap-1 col-span-3">
          <Label text={t("award")} htmlFor="award" />
          <TextInput
            name="award"
            placeholder="Bachelor of Science with Education"
            onChange={onChangeHandler}
            value={academic.award}
          />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 gap-x-6 mt-5">
        <div className="flex flex-col gap-1 col-span-1">
          <Label text={t("grade_classification")} htmlFor="classification" />
          <Select
            label={t("select_classification")}
            name="classification"
            value={academic.grade.classification}
            onChange={(e) =>
              setAcademic({
                ...academic,
                grade: {
                  ...academic.grade,
                  classification: e.target.value as AcademicClassification,
                },
              })
            }
          >
            <option value="First Class">{t("first_class")}</option>
            <option value="Upper Second">{t("upper_second")}</option>
            <option value="Lower Second">{t("lower_second")}</option>
            <option value="Pass">{t("pass")}</option>
            <option value="Fail">{t("fail")}</option>
          </Select>
        </div>

        <div className="flex flex-col gap-1 col-span-1">
          <Label text="Grade (GPA)" htmlFor="gpa" />
          <TextInput
            name="gpa"
            placeholder="3.4"
            value={academic.grade.gpa.toString()}
            onChange={(e) =>
              setAcademic({
                ...academic,
                grade: { ...academic.grade, gpa: e.target.value },
              })
            }
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 gap-x-6 mt-5">
        <div className="flex flex-col gap-1 col-span-1">
          <Label text={t("certificate")} htmlFor="certificate" />
          <FileInput
            name="certificate"
            onChange={onFileChange("certificate")}
          />
        </div>
        <div className="flex flex-col gap-1 col-span-1">
          <Label text={t("transcript")} htmlFor="transcript" />
          <FileInput name="transcript" onChange={onFileChange("transcript")} />
        </div>
      </div>

      <ActionButton
        text={editing ? t("update") : t("add")}
        theme="bg-violet-600"
        icon={<Plus size={16} />}
      />
    </form>
  );
};

export default AcademicForm;
