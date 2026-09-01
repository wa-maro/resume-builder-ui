import { useEffect, useState } from "react";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import SchoolForm from "../SchoolForm";
import SchoolTable from "../SchoolTable";
import { logAlert } from "../../utility/logging";
import { useResume } from "../../context/resume/ResumeContext";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const SchoolQualifications = () => {
  const { t } = useTranslation();
  const { resume } = useResume();
  const [schools, setSchools] = useState<School[]>([]);
  const [editing, setEditing] = useState<School | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<Alert>();

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  /** Map backend object → frontend School */
  const mapSchool = (a: any): School => ({
    _id: a._id,
    level: a.level,
    school: { name: a.schoolName, location: a.schoolLocation },
    startYear: a.startYear,
    endYear: a.endYear,
    certificate: a.certificate,
    award: a.award,
    grade: a.grade,
    resume: a.resume,
  });

  /** Fetch all School qualifications for this resume */
  const getSchools = async () => {
    if (!resume?._id) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/school-qualifications`,
        { method: "GET", headers: { Authorization: `Bearer ${token}` } },
      );

      const result = await res.json();

      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setSchools(result.schoolQualifications);
    } catch (error) {
      console.error("Failed to fetch School qualifications", error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  /** Add new school qualification */
  const addSchool = async (school: School) => {
    if (!resume?._id) return;

    try {
      const formData = new FormData();
      formData.append("level", school.level);
      formData.append("award", school.award);
      formData.append("school", JSON.stringify(school.school));
      formData.append("startYear", String(school.startYear));
      formData.append("endYear", String(school.endYear));

      if (
        school.grade &&
        school.grade.division &&
        school.grade.points !== "" &&
        school.grade.points !== null &&
        school.grade.points !== undefined
      ) {
        formData.append(
          "grade",
          JSON.stringify({
            division: school.grade.division,
            points: Number(school.grade.points),
          }),
        );
      }

      if (school.certificate instanceof File) {
        formData.append("certificate", school.certificate);
      }

      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/school-qualifications`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      const newSchool = mapSchool(
        result.schoolQualification || result.schoolQualifications?.[0],
      );

      setSchools((prev) => [...prev, newSchool]);
      setEditing(null);
    } catch (error) {
      console.error("Failed to add School", error);
    }
  };

  /** Update existing school qualification */
  const updateSchool = async (school: School) => {
    if (!resume?._id || !school._id) return;

    try {
      const original = schools.find((s) => s._id === school._id);
      const formData = new FormData();

      if (school.level !== original?.level)
        formData.append("level", school.level);
      if (school.award !== original?.award)
        formData.append("award", school.award);

      if (
        school.school?.name !== original?.school?.name ||
        school.school?.location !== original?.school?.location
      ) {
        formData.append("school", JSON.stringify(school.school));
      }

      if (school.startYear !== original?.startYear)
        formData.append("startYear", String(school.startYear));
      if (school.endYear !== original?.endYear)
        formData.append("endYear", String(school.endYear));

      if (
        school.grade?.division !== original?.grade?.division ||
        school.grade?.points !== original?.grade?.points
      ) {
        formData.append(
          "grade",
          JSON.stringify({
            division: school.grade?.division,
            points: school.grade?.points,
          }),
        );
      }

      if (school.certificate instanceof File) {
        formData.append("certificate", school.certificate);
      }

      // Skip update if no fields changed
      if ([...formData.keys()].length === 0) {
        console.log("No changes detected, skipping update.");
        setEditing(null);
        return;
      }

      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/school-qualifications/${school._id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      const updatedSchool = mapSchool(result.schoolQualification);
      setSchools((prev) =>
        prev.map((s) => (s._id === school._id ? updatedSchool : s)),
      );
      setEditing(null);
    } catch (error) {
      console.error("Failed to update School", error);
    }
  };

  /** Save school (decides add or update) */
  const saveSchool = async (school: School) => {
    if (school._id) {
      await updateSchool(school);
    } else {
      await addSchool(school);
    }
  };

  /** Delete school */
  const deleteSchool = async (id: string) => {
    if (!resume?._id) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/school-qualifications/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);

      if (!ok) return;

      setSchools((prev) => prev.filter((s) => s._id !== id));
      if (editing?._id === id) setEditing(null);
    } catch (error) {
      console.error("Failed to delete School", error);
    }
  };

  useEffect(() => {
    if (resume?._id) getSchools();
  }, [resume?._id]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <SectionHeader title={t("school_background")} />

      {alert && (
        <div className="absolute right-0 top-0">
          <Alert alert={alert} setAlert={setAlert} />
        </div>
      )}

      <SectionDivider
        title={editing ? t("edit_qualification") : t("new_qualification")}
      />

      <SchoolForm
        schools={schools}
        setSchools={setSchools}
        editing={editing}
        setEditing={setEditing}
        onSave={saveSchool}
      />

      <SectionDivider title={t("school_qualifications")} />

      <SchoolTable
        schools={schools}
        onDelete={deleteSchool}
        onEdit={setEditing} // Edit triggers form prefill
      />
    </div>
  );
};

export default SchoolQualifications;
