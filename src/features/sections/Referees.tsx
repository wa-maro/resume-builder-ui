import { useState } from "react";
import RefereeForm from "../RefereeForm";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import RefereeTable from "../RefereeTable";

const Referees = () => {
  const [references, setReferences] = useState<Referee[]>([]);

  return (
    <>
      <SectionHeader title="Referees" />

      <SectionDivider title="New Referee" />

      <RefereeForm references={references} setReferences={setReferences} />

      <SectionDivider title="Referees" />

      <RefereeTable references={references} />
    </>
  );
};

export default Referees;
