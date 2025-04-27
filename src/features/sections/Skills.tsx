import { useState } from "react";
import SkillForm from "../SkillForm";

const Skills = () => {
  const [skill, setSkill] = useState<Skill>({
    _id: "",
    category: "",
    name: "",
    proficiency: 50,
    description: "",
    certification: "",
    resumeId: "",
  });

  return (
    <>
      <article>
        <h2 className="font-medium text-sm text-gray-600">Skills</h2>
        <p className="text-xs text-gray-600">Mandatory Step</p>
      </article>

      <SkillForm skill={skill} setSkill={setSkill} />
    </>
  );
};

export default Skills;
