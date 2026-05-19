import { Plus } from "lucide-react";
import Label from "../components/form/Label";
import Select from "../components/form/Select";
import TextInput from "../components/form/TextInput";
import TextArea from "../components/form/TextArea";
import ActionButton from "../components/ui/ActionButton";
import { useEffect, useState } from "react";
import FileInput from "../components/form/FileInput";
import { useTranslation } from "react-i18next";

const newSkill: Skill = {
  category: "",
  name: "",
  proficiency: 50,
  description: "",
  certificate: "",
};

const SkillForm = ({
  skills,
  setSkills,
  editing,
  setEditing,
  onSave,
}: {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
  editing: Skill | null;
  setEditing?: React.Dispatch<React.SetStateAction<Skill | null>>;
  onSave?: (skill: Skill) => void;
}) => {
  const { t } = useTranslation();
  const [skill, setSkill] = useState<Skill>(newSkill);

  const onFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) setSkill({ ...skill, certificate: file });
  };

  const onChangeHandler = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setSkill({ ...skill, [ev.target.name]: ev.target.value });

  useEffect(() => {
    if (editing) {
      setSkill(editing);
    } else {
      setSkill(skill);
    }
  }, [editing]);

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!skill.category) return alert("Skill category is required");
    if (!skill.name) return alert("Skill name is required");
    if (!skill.proficiency) return alert("Skill proficiency is required");

    if (onSave) {
      onSave(skill);
    } else {
      if (editing) {
        setSkills((prev) => prev.map((p) => (p._id === skill._id ? skill : p)));
        setEditing?.(null);
      } else {
        setSkills([...skills, skill]);
      }
    }

    setSkill(newSkill);
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-x-6">
        <div className="flex flex-col gap-1">
          <Label text={t("category")} htmlFor="category" />
          <Select
            label={t("choose_category")}
            name="category"
            onChange={onChangeHandler}
            value={skill.category}
          >
            <option value="personal">{t("personal")}</option>
            <option value="professional">{t("professional")}</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label text={t("skill_name")} htmlFor="name" />
          <TextInput
            name="name"
            placeholder={t("skill_placeholder")}
            onChange={onChangeHandler}
            value={skill.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text={`${t("proficiency")} (%)`} htmlFor="proficiency" />
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min={0}
              step={5}
              max={100}
              className="bg-gray-100 outline-none border border-gray-400 rounded px-2.5 py-2 text-sm flex-1"
              name="proficiency"
              id="proficiency"
              onChange={onChangeHandler}
              value={skill.proficiency}
            />
            <p>{skill.proficiency}%</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <Label htmlFor="description" text={t("description_if_any")} />
        <TextArea
          name="description"
          onChange={onChangeHandler}
          value={skill.description ?? ""}
        />
      </div>

      <div className="flex flex-col gap-1 mt-5 relative">
        <Label text={t("certificate_if_any")} htmlFor="certificate" />
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

export default SkillForm;
