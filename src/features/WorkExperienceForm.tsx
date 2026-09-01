import { useEffect, useState } from "react";
import Label from "../components/form/Label";
import TextInput from "../components/form/TextInput";
import TextArea from "../components/form/TextArea";
import ActionButton from "../components/ui/ActionButton";
import { Plus } from "lucide-react";
import { useTranslation } from "react-i18next";
import Select from "../components/form/Select";
import { jobTitles } from "./ResumeForm";

const defaultExperience: Experience = {
  position: "",
  company: { name: "", location: "" },
  responsibilities: "",
  currentlyWorking: false,
  startDate: "",
  endDate: "",
  resume: "",
};

const WorkExperienceForm = ({
  experiences,
  setExperiences,
  editing,
  setEditing,
  onSave,
}: {
  experiences: Experience[];
  setExperiences: React.Dispatch<React.SetStateAction<Experience[]>>;
  editing: Experience | null;
  setEditing?: React.Dispatch<React.SetStateAction<Experience | null>>;
  onSave?: (experience: Experience) => void;
}) => {
  const { t } = useTranslation();
  const [experience, setExperience] = useState<Experience>(defaultExperience);

  // Populate form when editing
  useEffect(() => {
    if (editing) setExperience(editing);
    else setExperience(defaultExperience);
  }, [editing]);

  const onChangeHandler = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, type, value, checked } = ev.target as HTMLInputElement;

    const keys = name.split(".");
    const updatedExperience = { ...experience };
    let current: any = updatedExperience;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      current[key] = { ...current[key] };
      current = current[key];
    }

    // Checkbox handling
    current[keys[keys.length - 1]] = type === "checkbox" ? checked : value;

    // Auto-clear endDate if currentlyWorking is checked
    if (name === "currentlyWorking" && checked) {
      updatedExperience.endDate = "";
    }

    setExperience(updatedExperience);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation
    if (!experience.position) return alert("Position is required");
    if (!experience.responsibilities)
      return alert("Responsibilities are required");
    if (!experience.company.name || !experience.company.location)
      return alert("Company name and location are required");

    if (onSave) {
      onSave(experience);
    } else {
      if (editing) {
        setExperiences((prev) =>
          prev.map((s) => (s._id === experience._id ? experience : s)),
        );
        setEditing?.(null);
      } else {
        setExperiences([...experiences, experience]);
      }
    }

    setExperience(defaultExperience);
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-x-6">
        <div className="flex flex-col gap-1">
          <Label text={t("job_title")} htmlFor="position" />
          <Select
            label={t("select_job_title")}
            name="position"
            value={experience.position}
            onChange={onChangeHandler}
          >
            {jobTitles.map((job) => (
              <option key={job} value={job}>
                {t(`${job}`)}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label text={t("company_name")} htmlFor="company.name" />
          <TextInput
            name="company.name"
            placeholder="FluentTek"
            onChange={onChangeHandler}
            value={experience.company.name}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text={t("company_location")} htmlFor="company.location" />
          <TextInput
            name="company.location"
            placeholder="Mbinga, Tanzania"
            onChange={onChangeHandler}
            value={experience.company.location}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label text={t("starting_date")} htmlFor="startDate" />
          <TextInput
            name="startDate"
            placeholder={t("experience_start_placeholder")}
            onChange={onChangeHandler}
            value={experience.startDate}
          />
        </div>

        {!experience.currentlyWorking && (
          <div className="flex flex-col gap-1">
            <Label text={t("ending_date")} htmlFor="endDate" />
            <TextInput
              name="endDate"
              placeholder={t("experience_end_placeholder")}
              onChange={onChangeHandler}
              value={experience.endDate ?? ""}
            />
          </div>
        )}

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="currentlyWorking"
            name="currentlyWorking"
            checked={experience.currentlyWorking}
            onChange={onChangeHandler}
          />
          <Label text={t("currently_work_here")} htmlFor="currentlyWorking" />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <Label text={t("responsibilities")} htmlFor="responsibilities" />
        <TextArea
          name="responsibilities"
          placeholder={t("responsibilities_placeholder")}
          required
          onChange={onChangeHandler}
          value={experience.responsibilities}
        />
      </div>

      <ActionButton
        text={editing ? t("update") : t("add")}
        theme="bg-violet-600"
        icon={<Plus size={16} />}
      />
    </form>
  );
};

export default WorkExperienceForm;
