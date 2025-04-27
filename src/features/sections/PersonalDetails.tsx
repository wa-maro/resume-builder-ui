import { useState } from "react";
import PersonalDetailForm from "../PersonalDetailForm";
import SectionHeader from "../../components/SectionHeader";

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
      <SectionHeader title="Personal Information" />

      <PersonalDetailForm person={person} setPerson={setPerson} />
    </>
  );
};

export default PersonalDetails;
