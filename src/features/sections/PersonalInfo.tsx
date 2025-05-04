import PersonalDetailForm from "../PersonalInfoForm";
import SectionHeader from "../../components/SectionHeader";
import { useEffect, useState } from "react";
import { useResume } from "../../context/resume/ResumeContext";
import Spinner from "../../components/Spinner";
import { toYYYDDMM } from "../../utility/dateFormat";

const initialPerson: PersonalInfo = {
  _id: "",
  fullName: "",
  gender: "",
  dateOfBirth: "",
  nationality: "",
  placeOfDomicile: "",
  maritualStatus: "",
  disabilities: ["none"],
  email: "",
  phone: "",
  physicalAddress: "",
  resume: "",
};

const PersonalDetails = () => {
  const [person, setPerson] = useState<PersonalInfo>(initialPerson);
  const { resume } = useResume();
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const addPersonalInfo = async (data: PersonalInfo) => {
    try {
      const res = await fetch(
        `http://127.0.0.1:8080/api/v0/resume/${resume?._id}/personal-information`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) throw new Error("Request Error");

      const result: FetchResponse<PersonalInfo> = await res.json();
      if (!result.success) throw new Error(result.message);

      if (result.data) setPerson(result.data);
      else setPerson(initialPerson);
    } catch (error) {
      console.error("Failed to add personal info:", error);
    }
  };

  const getPersonalInfo = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8080/api/v0/resume/${resume?._id}/personal-information`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Request Error");

      const result: FetchResponse<PersonalInfo> = await res.json();
      if (!result.success) throw new Error(result.message);

      if (result.data)
        setPerson({
          ...result.data,
          dateOfBirth: toYYYDDMM(result.data.dateOfBirth),
        });
      else setPerson(initialPerson);
    } catch (error) {
      console.error("Can't get personal information", error);
      setPerson(initialPerson);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await getPersonalInfo();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <SectionHeader title="Personal Information" />

      <PersonalDetailForm
        person={person}
        setPerson={setPerson}
        addPersonalInfo={addPersonalInfo}
      />
    </>
  );
};

export default PersonalDetails;
