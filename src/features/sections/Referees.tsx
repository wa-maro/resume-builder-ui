import { useState } from "react";
import RefereeForm from "../RefereeForm";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";

const Referees = () => {
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
    </>
  );
};

export default Referees;
