import { useState } from "react";
import RefereeForm from "../RefereeForm";

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

      <RefereeForm reference={reference} setReference={setReference} />
    </>
  );
};

export default Referees;
