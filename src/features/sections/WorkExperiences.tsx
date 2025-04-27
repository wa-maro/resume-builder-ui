import { useState } from "react";
import WorkExperienceForm from "../WorkExperienceForm";
import SectionHeader from "../../components/SectionHeader";
import SectionDivider from "../../components/SectionDivider";

const WorkExperiences = () => {
  const [experience, setExperience] = useState<Experience>({
    _id: "",
    jobTitle: "",
    company: { name: "", location: "" },
    responsibilities: "",
    currentlyWorking: false,
    startDate: "",
    endDate: "",
    resumeId: "",
  });

  return (
    <>
      <SectionHeader title="Work Experience" mandatory={false} />

      <SectionDivider title="New Experience" />

      <WorkExperienceForm
        experience={experience}
        setExperience={setExperience}
      />
    </>
  );
};

export default WorkExperiences;
