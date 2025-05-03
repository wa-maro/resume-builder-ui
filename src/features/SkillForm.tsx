import { Plus } from "lucide-react";
import Label from "../components/Label";
import Select from "../components/Select";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import ActionButton from "../components/ActionButton";
import { useState } from "react";
import FileInput from "../components/FileInput";

const newSkill: Skill = {
  category: "",
  name: "",
  proficiency: 50,
  description: "",
  certification: "",
};

const SkillForm = ({
  skills,
  setSkills,
}: {
  skills: Skill[];
  setSkills: React.Dispatch<React.SetStateAction<Skill[]>>;
}) => {
  const [skill, setSkill] = useState<Skill>(newSkill);

  const onChangeHandler = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setSkill({ ...skill, [ev.target.name]: ev.target.value });

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // set resume ID
    skill.resumeId = "";

    setSkills([...skills, skill]);
    setSkill(newSkill);
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="flex flex-col gap-1">
          <Label text="category" htmlFor="category" />
          <Select
            label="Choose category"
            name="category"
            onChange={onChangeHandler}
            value={skill.category}
          >
            <option value="personal">Personal</option>
            <option value="professional">Professional</option>
          </Select>
        </div>
        <div className="flex flex-col gap-1">
          <Label text="Skill name" htmlFor="name" />
          <TextInput
            name="name"
            placeholder="E.g. Communication"
            onChange={onChangeHandler}
            value={skill.name}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label text="proficiency" htmlFor="proficiency" />
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
        <Label htmlFor="description" text="description (if any)" />
        <TextArea
          name="description"
          onChange={onChangeHandler}
          value={skill.description}
        />
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <Label text="Certificate (if any)" htmlFor="certification" />
        <FileInput
          name="certification"
          onChange={onChangeHandler}
          value={skill.certification}
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

export default SkillForm;
