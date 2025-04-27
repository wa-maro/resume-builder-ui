import { Plus } from "lucide-react";
import Label from "../components/Label";
import Select from "../components/Select";
import TextInput from "../components/TextInput";

const SkillForm = ({
  skill,
  setSkill,
}: {
  skill: Skill;
  setSkill: React.Dispatch<React.SetStateAction<Skill>>;
}) => {
  const handleChange = (
    ev: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => setSkill({ ...skill, [ev.target.name]: ev.target.value });

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="text-sm flex items-center space-x-2 mt-6 mb-5">
        <span className="h-0.5 bg-teal-400 flex-1"></span>
        <span>New Skill</span>
        <span className="h-0.5 bg-teal-400 flex-1"></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        <div className="flex flex-col gap-1">
          <Label text="category" htmlFor="category" />
          <Select
            label="Choose category"
            name="category"
            onChange={handleChange}
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
            onChange={handleChange}
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
              onChange={handleChange}
              value={skill.proficiency}
            />
            <p>{skill.proficiency}%</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <Label htmlFor="description" text="description (if any)" />
        <textarea
          name="description"
          rows={4}
          required
          className="w-full outline-none border border-gray-400 rounded px-2.5 py-2 "
        />
      </div>

      <div className="flex flex-col gap-1 mt-5">
        <Label text="Certificate (if any)" htmlFor="certification" />
        <input
          className="font-medium text-sm text-gray-500 bg-gray-100 rounded max-w-fit cursor-pointer file:cursor-pointer file:border-0 file:py-1.5 file:px-2.5 file:mr-4 file:bg-gray-800 file:text-white"
          type="file"
          name="certification"
          onChange={handleChange}
          value={skill.certification}
        />
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="submit"
          className="bg-violet-400 text-gray-100 rounded-s font-medium px-3.5 py-1.5 text-sm text-nowrap text-center flex items-center gap-x-2"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>
    </form>
  );
};

export default SkillForm;
