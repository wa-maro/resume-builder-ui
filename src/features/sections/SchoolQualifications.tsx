import { useState } from "react";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import SchoolForm from "../SchoolForm";

const SchoolQualifications = () => {
  const [school, setSchool] = useState<School>({
    _id: "",
    award: "",
    institution: { name: "", location: "" },
    startYear: "",
    endYear: "",
    grade: { division: "", points: "" },
    uploadedCertificate: "",
    resumeId: "",
  });
  return (
    <>
      <SectionHeader title="Education Background" />

      <SectionDivider title="New School Qualification" />

      <SchoolForm school={school} setSchool={setSchool} />
    </>
  );
};

export default SchoolQualifications;
