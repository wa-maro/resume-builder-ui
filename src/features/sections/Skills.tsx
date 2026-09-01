import { useEffect, useState } from "react";
import SkillForm from "../SkillForm";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import SkillTable from "../SkillTable";
import { useResume } from "../../context/resume/ResumeContext";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import { logAlert } from "../../utility/logging";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const Skills = () => {
  const { t } = useTranslation();
  const { resume } = useResume();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<Alert>();

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  /** Fetch all skills for this resume */
  const getSkills = async () => {
    if (!resume?._id) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/resume/${resume._id}/skills`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setSkills(result.skills ?? []);
    } catch (error) {
      console.error("❌ Failed to fetch skills", error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  /** Add a new skill */
  const addSkill = async (skill: Skill) => {
    if (!resume?._id) return;

    try {
      const formData = new FormData();
      formData.append("category", skill.category);
      formData.append("name", skill.name);
      formData.append("proficiency", String(skill.proficiency));

      if (skill.description)
        formData.append("description", skill.description.trim());
      if (skill.certificate instanceof File) {
        formData.append("certificate", skill.certificate);
      }

      const res = await fetch(`${API_BASE_URL}/resume/${resume._id}/skills`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // do NOT set Content-Type for FormData
        },
        body: formData,
      });

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setSkills((prev) => [...prev, result.skill]);
      setEditing(null);
    } catch (error) {
      console.error("❌ Failed to add skill", error);
    }
  };

  /** Update an existing skill */
  const updateSkill = async (skill: Skill) => {
    if (!resume?._id || !skill._id) return;

    try {
      const formData = new FormData();
      formData.append("category", skill.category);
      formData.append("name", skill.name);
      formData.append("proficiency", String(skill.proficiency));

      if (skill.description)
        formData.append("description", skill.description.trim());
      if (skill.certificate instanceof File) {
        formData.append("certificate", skill.certificate);
      }

      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/skills/${skill._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`, // do NOT set Content-Type for FormData
          },
          body: formData,
        },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setSkills((prev) =>
        prev.map((exp) => (exp._id === skill._id ? result.skill : exp)),
      );
      setEditing(null);
    } catch (error) {
      console.error("❌ Failed to update skill", error);
    }
  };

  /** Save skill (add or update) */
  const saveSkill = async (skill: Skill) => {
    if (skill._id) {
      await updateSkill(skill);
    } else {
      await addSkill(skill);
    }
  };

  /** Delete handler */
  const deleteSkill = async (id: string) => {
    if (!resume?._id) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/skills/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setSkills((prev) => prev.filter((s) => s._id !== id));
      if (editing?._id === id) setEditing(null);
    } catch (error) {
      console.error("❌ Failed to delete skill", error);
    }
  };

  useEffect(() => {
    if (resume?._id) getSkills();
  }, [resume?._id]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <SectionHeader title={t("skills")} mandatory={false} />

      {alert && (
        <div className="absolute right-0 top-0">
          <Alert alert={alert} setAlert={setAlert} />
        </div>
      )}

      <SectionDivider title={t("new_skill")} />

      <SkillForm
        skills={skills}
        setSkills={setSkills}
        editing={editing}
        setEditing={setEditing}
        onSave={saveSkill}
      />

      <SectionDivider title={t("skills")} />

      <SkillTable skills={skills} onEdit={setEditing} onDelete={deleteSkill} />
    </div>
  );
};

export default Skills;
