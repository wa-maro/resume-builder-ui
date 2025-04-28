import { useState } from "react";
import SkillForm from "../SkillForm";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import SkillTable from "../SkillTable";

const Skills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);

  return (
    <>
      <SectionHeader title="Skills" mandatory={false} />

      <SectionDivider title="New Skill" />

      <SkillForm skills={skills} setSkills={setSkills} />

      <SectionDivider title="Skills" />

      <SkillTable skills={skills} />
    </>
  );
};

export default Skills;
