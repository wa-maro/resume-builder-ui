import PersonalDetailForm from "../PersonalInfoForm";
import SectionHeader from "../../components/SectionHeader";
import { useState } from "react";

const initialPerson: PersonalInfo = {
  _id: "",
  fullName: "",
  nationality: "",
  dateOfBirth: "",
  placeOfDomicile: "",
  gender: "male", // or "female"
  email: "",
  phone: "",
  physicalAddress: "", // changed from physicalAddress
  disabilities: ["none"],
  maritualStatus: "single", // optional, can be left out
  resumeId: "",
};

const PersonalDetails = () => {
  const [person, setPerson] = useState<PersonalInfo>(initialPerson);

  return (
    <>
      <SectionHeader title="Personal Information" />

      <PersonalDetailForm person={person} setPerson={setPerson} />
    </>
  );
};

export default PersonalDetails;
