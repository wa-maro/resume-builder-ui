import { useState } from "react";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import AcademicForm from "../AcademicForm";
import AcademicTable from "../AcademicTable";

const AcademicQualifications = () => {
  const [academics, setAcademics] = useState<Academic[]>([]);

  return (
    <>
      <SectionHeader title="Education Background" />

      <SectionDivider title="New Qualification" />

      <AcademicForm academics={academics} setAcademics={setAcademics} />

      <SectionDivider title="Academic Qualifications" />

      <AcademicTable academics={academics} />
    </>
  );
};

export default AcademicQualifications;
