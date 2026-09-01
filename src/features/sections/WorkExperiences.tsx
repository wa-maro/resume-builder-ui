import { useEffect, useState } from "react";
import WorkExperienceForm from "../WorkExperienceForm";
import WorkExperienceTable from "../WorkExperienceTable";
import SectionHeader from "../../components/SectionHeader";
import SectionDivider from "../../components/SectionDivider";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import { useResume } from "../../context/resume/ResumeContext";
import { logAlert } from "../../utility/logging";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const WorkExperiences = () => {
  const { t } = useTranslation();
  const { resume } = useResume();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [editing, setEditing] = useState<Experience | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<Alert>();

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  /** Fetch all work experiences for this resume */
  const getExperiences = async () => {
    if (!resume?._id) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/work-experiences`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setExperiences(result.workExperiences ?? []);
    } catch (error) {
      console.error("❌ Failed to fetch work experiences", error);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  /** Add a new work experience */
  const addExperience = async (experience: Experience) => {
    if (!resume?._id) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/work-experiences`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            position: experience.position,
            company: experience.company,
            responsibilities: experience.responsibilities,
            startDate: experience.startDate,
            endDate: experience.endDate,
            currentlyWorking: experience.currentlyWorking,
          }),
        },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setExperiences((prev) => [...prev, result.workExperience]);
      setEditing(null);
    } catch (error) {
      console.error("❌ Failed to add work experience", error);
    }
  };

  /** Update an existing work experience */
  const updateExperience = async (experience: Experience) => {
    if (!resume?._id || !experience._id) return;

    const updatableFields: (keyof Pick<
      Experience,
      | "position"
      | "company"
      | "responsibilities"
      | "startDate"
      | "endDate"
      | "currentlyWorking"
    >)[] = [
      "position",
      "company",
      "responsibilities",
      "startDate",
      "endDate",
      "currentlyWorking",
    ];

    const payload = Object.fromEntries(
      updatableFields
        .map((field) => [field, experience[field]])
        .filter(
          ([_, value]) => value !== undefined && value !== null && value !== "",
        ),
    );

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/work-experiences/${experience._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );
      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setExperiences((prev) =>
        prev.map((exp) =>
          exp._id === experience._id ? result.workExperience : exp,
        ),
      );
      setEditing(null);
    } catch (error) {
      console.error("❌ Failed to update work experience", error);
    }
  };

  /** Save experience (add or update) */
  const saveExperience = async (experience: Experience) => {
    if (experience._id) {
      await updateExperience(experience);
    } else {
      await addExperience(experience);
    }
  };

  /** Edit handler */
  const handleEditExperience = (experience: Experience) => {
    setEditing(experience);
    window.scrollTo({ top: 0, behavior: "smooth" }); // UX improvement
  };

  /** Delete handler */
  const deleteExperience = async (id: string) => {
    if (!resume?._id) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/work-experiences/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setExperiences((prev) => prev.filter((s) => s._id !== id));
      if (editing?._id === id) setEditing(null);
    } catch (error) {
      console.error("❌ Failed to delete work experience", error);
    }
  };

  useEffect(() => {
    if (resume?._id) getExperiences();
  }, [resume?._id]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <SectionHeader title={t("work_experience")} mandatory={false} />

      {alert && (
        <div className="absolute right-0 top-0">
          <Alert alert={alert} setAlert={setAlert} />
        </div>
      )}

      <SectionDivider
        title={editing ? t("edit_experience") : t("new_experience")}
      />

      <WorkExperienceForm
        experiences={experiences}
        setExperiences={setExperiences}
        editing={editing}
        setEditing={setEditing}
        onSave={saveExperience}
      />

      <SectionDivider title={t("experiences")} />

      <WorkExperienceTable
        experiences={experiences}
        onEdit={handleEditExperience}
        onDelete={deleteExperience}
      />
    </div>
  );
};

export default WorkExperiences;
