import { useState } from "react";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import ProfessionForm from "../ProfessionForm";
import ProfessionTable from "../ProfessionTable";

const ProfessionQualifications = () => {
  const [professions, setProfessions] = useState<Profession[]>([]);

  return (
    <>
      <SectionHeader title="Education Background" mandatory={false} />

      <SectionDivider title="New Qualification" />

      <ProfessionForm
        professions={professions}
        setProfessions={setProfessions}
      />

      <SectionDivider title="Profession Qualification" />

      <ProfessionTable professions={professions} />
    </>
  );
};

export default ProfessionQualifications;
