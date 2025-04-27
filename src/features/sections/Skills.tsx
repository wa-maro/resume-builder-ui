import { useState } from "react";
import SkillForm from "../SkillForm";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";

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
      <SectionHeader title="Skills" mandatory={false} />

      <SectionDivider title="New Skill" />

      <SkillForm skill={skill} setSkill={setSkill} />
    </>
  );
};

export default Skills;
