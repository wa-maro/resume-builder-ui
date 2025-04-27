import { useState } from "react";
import PersonalDetailForm from "../PersonalDetailForm";

const PersonalDetails = () => {
  const [person, setPerson] = useState<Person>({
    _id: "",
    fullName: "",
    nationality: "",
    dateOfBirth: "",
    placeOfDomicile: "",
    sex: "",
    email: "",
    phone: "",
    physicalAddress: "",
    disabilities: "",
    resumeId: "",
  });

  return (
    <>
      <article>
        <h2 className="font-medium text-sm text-gray-600">
          Personal Information
        </h2>
        <p className="text-xs text-gray-600">Mandatory Step</p>
      </article>

      <PersonalDetailForm person={person} setPerson={setPerson} />
    </>
  );
};

export default PersonalDetails;
