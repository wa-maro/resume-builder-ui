import { useState } from "react";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import SchoolForm from "../SchoolForm";
import SchoolTable from "../SchoolTable";

const SchoolQualifications = () => {
  const [schools, setSchools] = useState<School[]>([]);

  return (
    <>
      <SectionHeader title="Education Background" />

      <SectionDivider title="New Qualification" />

      <SchoolForm schools={schools} setSchools={setSchools} />

      <SectionDivider title="School Qualifications" />

      <SchoolTable schools={schools} />
    </>
  );
};

export default SchoolQualifications;
