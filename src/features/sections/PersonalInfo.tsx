import PersonalDetailForm from "../PersonalInfoForm";
import SectionHeader from "../../components/SectionHeader";
import { useEffect, useState } from "react";
import { useResume } from "../../context/resume/ResumeContext";
import Spinner from "../../components/ui/Spinner";
import { toYYYDDMM } from "../../utility/dateFormat";
import Alert from "../../components/ui/Alert";
import { logAlert } from "../../utility/logging";
import { useTranslation } from "react-i18next";

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

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const PersonalDetails = () => {
  const { t } = useTranslation();
  const [person, setPerson] = useState<PersonalInfo>(initialPerson);
  const { resume } = useResume();
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [alert, setAlert] = useState<Alert>();

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const addPersonalInfo = async (data: PersonalInfo) => {
    if (!resume?._id) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/personal-information`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result: FetchResponse<PersonalInfo> = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok || !result.data) return;

      setPerson({
        ...result.data,
        dateOfBirth: toYYYDDMM(result.data.dateOfBirth),
      });
    } catch (error) {
      console.error("Failed to add personal info:", error);
    }
  };

  const getPersonalInfo = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume?._id}/personal-information`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result: FetchResponse<PersonalInfo> = await res.json();

      const ok = logAlert(result, setAlert);
      if (!ok || !result.data) return;

      setPerson({
        ...result.data,
        dateOfBirth: toYYYDDMM(result.data.dateOfBirth),
      });
      logAlert(result, setAlert);
    } catch (error) {
      console.error("Can't get personal information", error);
      setPerson(initialPerson);
    } finally {
      setLoading(false);
    }
  };

  const updatePersonalInfo = async (data: PersonalInfo) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume?._id}/personal-information/${person?._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result: FetchResponse<PersonalInfo> = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok || !result.data) return;

      setPerson({
        ...result.data,
        dateOfBirth: toYYYDDMM(result.data.dateOfBirth),
      });
    } catch (error) {
      console.error("Failed to update personal info:", error);
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
    <div className="relative p-6">
      <SectionHeader title={t("personal_information")} />

      <div className="absolute right-0 top-0">
        {alert && <Alert alert={alert} setAlert={setAlert} />}
      </div>

      <PersonalDetailForm
        person={person}
        setPerson={setPerson}
        addPersonalInfo={addPersonalInfo}
        updatePersonalInfo={updatePersonalInfo}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default PersonalDetails;
