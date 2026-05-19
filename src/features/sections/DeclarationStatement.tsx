import { useEffect, useState } from "react";
import SectionHeader from "../../components/SectionHeader";
import DeclarationForm from "../DeclarationForm";
import SectionDivider from "../../components/SectionDivider";
import Alert from "../../components/ui/Alert";
import { useResume } from "../../context/resume/ResumeContext";
import Spinner from "../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
import { toDDMMYYYY, toYYYDDMM } from "../../utility/dateFormat";

const initialDeclaration: Declaration = {
  statement:
    "I hereby declare that all the information provided in this resume is true and correct to the best of my knowledge and belief. I take full responsibility for the accuracy of the particulars mentioned herein.",
  signature: "",
  date: new Date().toISOString().split("T")[0],
};

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const SummaryAndDeclaration = () => {
  const { t } = useTranslation();
  const { resume, loading } = useResume();
  const [declaration, setDeclaration] =
    useState<Declaration>(initialDeclaration);
  const [alert, setAlert] = useState<Alert>();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const updateDeclaration = async (declaration: Declaration) => {
    if (!resume?._id) return;

    const payload = {
      ...declaration,
      signature: declaration.signature ?? "",
      date: toDDMMYYYY(declaration.date),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/resume/${resume._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ declaration: payload }),
      });

      const result: FetchResponse<Resume> = await res.json();

      if (!result.success) throw new Error(result.message);

      setAlert({
        success: true,
        messages: ["Resume Declaration updated successfully!"],
      });
      setIsEditing(false);
    } catch (error) {
      setAlert({
        success: true,
        messages: ["Resume declaration update failed:"],
      });
    }
  };

  useEffect(() => {
    if (resume?.declaration) {
      setDeclaration({
        ...resume.declaration,
        date: toYYYDDMM(resume.declaration.date),
      });
    }
  }, [resume?.declaration]);

  if (loading) return <Spinner />;

  return (
    <div className="p-6">
      <SectionHeader title={t("declaration_statement")} />

      {alert && (
        <div className="absolute right-0 top-0">
          <Alert alert={alert} setAlert={setAlert} />
        </div>
      )}

      <SectionDivider title={t("new_declaration")} />

      <DeclarationForm
        declaration={declaration}
        setDeclaration={setDeclaration}
        onSave={updateDeclaration}
        setAlert={setAlert}
        resume={resume}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
};

export default SummaryAndDeclaration;
