import { useState } from "react";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import AcademicForm from "../AcademicForm";

const AcademicQualifications = () => {
  const [academic, setAcademic] = useState<Academic>({
    _id: "",
    award: "",
    institution: { name: "", location: "" },
    startYear: "",
    endYear: "",
    uploadedCertificate: "",
    uploadedTranscript: "",
    grade: { classification: "", gpa: "" },
    resumeId: "",
  });

  return (
    <>
      <SectionHeader title="Education Background" mandatory={false} />

      <SectionDivider title="New Academic Qualification" />

      <AcademicForm academic={academic} setAcademic={setAcademic} />
    </>
  );
};

export default AcademicQualifications;
