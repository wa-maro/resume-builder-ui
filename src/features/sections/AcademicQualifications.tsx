import { useEffect, useState } from "react";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import AcademicForm from "../AcademicForm";
import AcademicTable from "../AcademicTable";
import { useResume } from "../../context/resume/ResumeContext";
import { logAlert } from "../../utility/logging";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const AcademicQualifications = () => {
  const { t } = useTranslation();
  const { resume } = useResume();
  const [academics, setAcademics] = useState<Academic[]>([]);
  const [editing, setEditing] = useState<Academic | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<Alert>();

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  /** Map backend object → frontend Academic */
  const mapAcademic = (a: any): Academic => ({
    _id: a._id,
    level: a.level,
    institution: { name: a.institutionName, location: a.institutionLocation },
    startYear: a.startYear,
    endYear: a.endYear,
    certificate: a.certificate,
    transcript: a.transcript,
    award: a.award,
    grade: a.grade,
    resume: a.resume,
  });

  /** Fetch all Academic qualifications for this resume */
  const getAcademics = async () => {
    if (!resume?._id) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/academic-qualifications`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } },
      );

      const result = await res.json();

      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setAcademics(result.academicQualifications);
    } catch (error) {
      console.error("Failed to fetch Academic qualifications", error);
      setAcademics([]);
    } finally {
      setLoading(false);
    }
  };

  /** Add new academic qualification */
  const addAcademic = async (academic: Academic) => {
    if (!resume?._id) return;

    try {
      const formData = new FormData();
      formData.append("level", academic.level);
      formData.append("award", academic.award || "");
      formData.append("institutionName", academic.institution.name);
      formData.append("institutionLocation", academic.institution.location);
      formData.append("startYear", String(academic.startYear));
      formData.append("endYear", String(academic.endYear));
      if (academic.grade) {
        formData.append(
          "gradeClassification",
          academic.grade.classification || "",
        );
        formData.append("gradeGPA", String(academic.grade.gpa || ""));
      }
      if (academic.certificate instanceof File) {
        formData.append("certificate", academic.certificate);
      }
      if (academic.transcript instanceof File) {
        formData.append("transcript", academic.transcript);
      }
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/academic-qualifications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // no Content-Type
          },
          body: formData,
        },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      const newAcademic = mapAcademic(
        result.academicQualification || result.academicQualifications?.[0],
      );
      setAcademics((prev) => [...prev, newAcademic]);
      setEditing(null);
    } catch (error) {
      console.error("Failed to add academic", error);
    }
  };

  /** Update existing academic qualification */
  const updateAcademic = async (academic: Academic) => {
    if (!resume?._id || !academic._id) return;

    try {
      const original = academics.find((s) => s._id === academic._id);
      const formData = new FormData();

      if (academic.level !== original?.level)
        formData.append("level", academic.level);
      if (academic.award !== original?.award)
        formData.append("award", academic.award || "");

      if (
        academic.institution?.name !== original?.institution?.name ||
        academic.institution?.location !== original?.institution?.location
      ) {
        formData.append("institutionName", academic.institution.name);
        formData.append("institutionLocation", academic.institution.location);
      }

      if (academic.startYear !== original?.startYear)
        formData.append("startYear", String(academic.startYear));
      if (academic.endYear !== original?.endYear)
        formData.append("endYear", String(academic.endYear));

      if (
        academic.grade?.classification !== original?.grade?.classification ||
        academic.grade?.gpa !== original?.grade?.gpa
      ) {
        formData.append(
          "gradeClassification",
          academic.grade?.classification || "",
        );
        formData.append("gpa", String(academic.grade?.gpa || ""));
      }

      if (
        academic.certificate &&
        academic.certificate !== original?.certificate
      ) {
        formData.append("certificate", academic.certificate);
      }
      if (academic.transcript && academic.transcript !== original?.transcript) {
        formData.append("transcript", academic.transcript);
      }

      if (
        formData.has("level") ||
        formData.has("award") ||
        formData.has("institutionName") ||
        formData.has("certificate") ||
        formData.has("transcript")
      ) {
        const res = await fetch(
          `${API_BASE_URL}/resume/${resume._id}/academic-qualifications/${academic._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`, // no Content-Type
            },
            body: formData,
          },
        );

        const result = await res.json();
        const ok = logAlert(result, setAlert);
        if (!ok) return;

        const updatedAcademic = mapAcademic(result.academicQualification);
        setAcademics((prev) =>
          prev.map((s) => (s._id === academic._id ? updatedAcademic : s)),
        );
      } else {
        console.log("No changes detected, skipping update.");
      }

      setEditing(null);
    } catch (error) {
      console.error("Failed to update academic", error);
    }
  };

  /** Save Academic (decides add or update) */
  const saveAcademic = async (academic: Academic) => {
    if (academic._id) {
      await updateAcademic(academic);
    } else {
      await addAcademic(academic);
    }
  };

  /** Delete academic */
  const deleteAcademic = async (id: string) => {
    if (!resume?._id) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/academic-qualifications/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);

      if (!ok) return;

      setAcademics((prev) => prev.filter((s) => s._id !== id));
      if (editing?._id === id) setEditing(null);
    } catch (error) {
      console.error("Failed to delete academic", error);
    }
  };

  useEffect(() => {
    if (resume?._id) getAcademics();
  }, [resume?._id]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <SectionHeader title={t("education_background")} mandatory={false} />

      {alert && (
        <div className="absolute right-0 top-0">
          <Alert alert={alert} setAlert={setAlert} />
        </div>
      )}

      <SectionDivider title={t("new_qualification")} />

      <AcademicForm
        academics={academics}
        setAcademics={setAcademics}
        editing={editing}
        setEditing={setEditing}
        onSave={saveAcademic}
      />

      <SectionDivider title={t("professional_qualification")} />

      <AcademicTable
        academics={academics}
        onDelete={deleteAcademic}
        onEdit={setEditing} // Edit triggers form prefill
      />
    </div>
  );
};

export default AcademicQualifications;
