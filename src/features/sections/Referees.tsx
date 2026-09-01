import { useEffect, useState } from "react";
import RefereeForm from "../RefereeForm";
import SectionDivider from "../../components/SectionDivider";
import SectionHeader from "../../components/SectionHeader";
import RefereeTable from "../RefereeTable";
import { useResume } from "../../context/resume/ResumeContext";
import { logAlert } from "../../utility/logging";
import Spinner from "../../components/ui/Spinner";
import Alert from "../../components/ui/Alert";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const Referees = () => {
  const { t } = useTranslation();
  const { resume } = useResume();
  const [references, setReferences] = useState<Referee[]>([]);
  const [editing, setEditing] = useState<Referee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [alert, setAlert] = useState<Alert>();

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  /** Fetch all referees for this resume */
  const getReferences = async () => {
    if (!resume?._id) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/resume/${resume._id}/referees`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setReferences(result.referees ?? []);
    } catch (error) {
      setReferences([]);
    } finally {
      setLoading(false);
    }
  };

  /** Add a new referee */
  const addReference = async (reference: Referee) => {
    if (!resume?._id) return;

    try {
      const res = await fetch(`${API_BASE_URL}/resume/${resume._id}/referees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullName: reference.fullName,
          position: reference.position,
          organization: reference.organization,
          email: reference.email,
          phone: reference.phone,
          physicalAddress: reference.physicalAddress,
        }),
      });

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setReferences((prev) => [...prev, result.referee]);
      setEditing(null);
    } catch (error) {
      console.error("❌ Failed to add referee", error);
    }
  };

  /** Update an existing referee */
  const updateReference = async (reference: Referee) => {
    if (!resume?._id || !reference._id) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/referees/${reference._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: reference.fullName,
            position: reference.position,
            organization: reference.organization,
            email: reference.email,
            phone: reference.phone,
            physicalAddress: reference.physicalAddress,
          }),
        },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setReferences((prev) =>
        prev.map((exp) => (exp._id === reference._id ? result.referee : exp)),
      );
      setEditing(null);
    } catch (error) {
      console.error("❌ Failed to update referee", error);
    }
  };

  /** Save referee (add or update) */
  const saveReference = async (reference: Referee) => {
    if (reference._id) {
      await updateReference(reference);
    } else {
      await addReference(reference);
    }
  };

  /** Delete handler */
  const deleteReference = async (id: string) => {
    if (!resume?._id) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume._id}/referees/${id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
      );

      const result = await res.json();
      const ok = logAlert(result, setAlert);
      if (!ok) return;

      setReferences((prev) => prev.filter((s) => s._id !== id));
      if (editing?._id === id) setEditing(null);
    } catch (error) {
      console.error("❌ Failed to delete referee", error);
    }
  };

  useEffect(() => {
    if (resume?._id) getReferences();
  }, [resume?._id]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <SectionHeader title={t("referees")} />

      {alert && (
        <div className="absolute right-0 top-0">
          <Alert alert={alert} setAlert={setAlert} />
        </div>
      )}

      <SectionDivider title={t("new_referee")} />

      <RefereeForm
        references={references}
        setReferences={setReferences}
        editing={editing}
        setEditing={setEditing}
        onSave={saveReference}
      />

      <SectionDivider title={t("referees")} />

      <RefereeTable
        references={references}
        onEdit={setEditing}
        onDelete={deleteReference}
      />
    </div>
  );
};

export default Referees;
