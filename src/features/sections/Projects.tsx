import { useEffect, useState } from "react";
import { useResume } from "../../context/resume/ResumeContext";
import { logAlert } from "../../utility/logging";
import Spinner from "../../components/ui/Spinner";
import SectionHeader from "../../components/SectionHeader";
import Alert from "../../components/ui/Alert";
import SectionDivider from "../../components/SectionDivider";
import ProjectForm from "../ProjectForm";
import ProjectTable from "../ProjectTable";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const Projects = () => {
  const { t } = useTranslation();
  const { resume } = useResume();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<Alert>();

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  /** Fetch all projects for this resume */
  const getProjects = async () => {
    if (!resume?._id) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/resume/${resume._id}/projects`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setProjects(result.projects ?? []);
    } catch (error) {
      console.error("❌ Failed to fetch projects", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  /** Add a new project */
  const addProject = async (project: Project) => {
    if (!resume?._id) return;

    try {
      const formData = new FormData();
      formData.append("title", project.title);
      formData.append("description", project.description);
      if (project.tools?.length)
        formData.append("tools", project.tools.join(","));
      if (project.socialLinks?.length)
        formData.append("socialLinks", project.socialLinks.join(","));
      if (project.image instanceof File)
        formData.append("image", project.image);

      const res = await fetch(`${API_BASE_URL}/resume/${resume._id}/projects`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // no Content-Type
        body: formData,
      });

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setProjects((prev) => [...prev, result.project]);
      setEditing(null);
    } catch (error) {
      console.error("❌ Failed to add project", error);
    }
  };

  /** Update an existing project */
  const updateProject = async (project: Project) => {
    if (!resume?._id || !project._id) return;

    try {
      const formData = new FormData();
      formData.append("title", project.title);
      formData.append("description", project.description);
      if (project.tools?.length)
        formData.append("tools", project.tools.join(","));
      if (project.socialLinks?.length)
        formData.append("socialLinks", project.socialLinks.join(","));
      if (project.image instanceof File)
        formData.append("image", project.image);

      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/projects/${project._id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` }, // no Content-Type
          body: formData,
        },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setProjects((prev) =>
        prev.map((exp) => (exp._id === project._id ? result.project : exp)),
      );
      setEditing(null);
    } catch (error) {
      console.error("❌ Failed to update project", error);
    }
  };

  /** Save project (add or update) */
  const saveProject = async (project: Project) => {
    if (project._id) {
      await updateProject(project);
    } else {
      await addProject(project);
    }
  };

  /** Delete handler */
  const deleteProject = async (id: string) => {
    if (!resume?._id) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/projects/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setProjects((prev) => prev.filter((s) => s._id !== id));
      if (editing?._id === id) setEditing(null);
    } catch (error) {
      console.error("❌ Failed to delete project", error);
    }
  };

  useEffect(() => {
    if (resume?._id) getProjects();
  }, [resume?._id]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <SectionHeader title={t("projects")} mandatory={true} />

      {alert && (
        <div className="absolute right-0 top-0">
          <Alert alert={alert} setAlert={setAlert} />
        </div>
      )}

      <SectionDivider title={editing ? t("edit_project") : t("new_project")} />

      <ProjectForm
        projects={projects}
        setProjects={setProjects}
        editing={editing}
        setEditing={setEditing}
        onSave={saveProject}
      />

      <SectionDivider title={t("projects")} />

      <ProjectTable
        projects={projects}
        onEdit={(p) => setEditing(p)}
        onDelete={deleteProject}
      />
    </div>
  );
};

export default Projects;
