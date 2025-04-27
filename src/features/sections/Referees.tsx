import { useState } from "react";
import RefereeForm from "../RefereeForm";
import SectionDivider from "../../components/SectionDivider";

const Referees = () => {
  const [reference, setReference] = useState<Reference>({
    _id: "",
    fullName: "",
    position: "",
    institution: "",
    email: "",
    phone: "",
    physicalAddress: "",
    resumeId: "",
  });

  return (
    <>
      <article>
        <h2 className="font-medium text-sm text-gray-600">Referees</h2>
        <p className="text-xs text-gray-600">Mandatory Step</p>
      </article>

      <SectionDivider title="New Referee" />

      <RefereeForm reference={reference} setReference={setReference} />
    </>
  );
};

export default Referees;
