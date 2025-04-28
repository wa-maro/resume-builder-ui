import { useState } from "react";
import WorkExperienceForm from "../WorkExperienceForm";
import SectionHeader from "../../components/SectionHeader";
import SectionDivider from "../../components/SectionDivider";
import WorkExperienceTable from "../WorkExperienceTable";

const WorkExperiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);

  return (
    <>
      <SectionHeader title="Work Experience" mandatory={false} />

      <SectionDivider title="New Experience" />

      <WorkExperienceForm
        experiences={experiences}
        setExperiences={setExperiences}
      />

      <SectionDivider title="Experiences" />

      <WorkExperienceTable experiences={experiences} />
    </>
  );
};

export default WorkExperiences;
