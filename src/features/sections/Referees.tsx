import { useState } from "react";
import RefereeForm from "../RefereeForm";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import RefereeTable from "../RefereeTable";

const Referees = () => {
  const [references] = useState<Reference[]>([]);
  const [reference, setReference] = useState<Reference>({
    _id: "",
    fullName: "",
    position: "",
    organization: "",
    email: "",
    phone: "",
    physicalAddress: "",
    resumeId: "",
  });

  return (
    <>
      <SectionHeader title="Referees" />

      <SectionDivider title="New Referee" />

      <RefereeForm reference={reference} setReference={setReference} />

      <SectionDivider title="Referees" />

      <RefereeTable references={references} />
    </>
  );
};

export default Referees;
