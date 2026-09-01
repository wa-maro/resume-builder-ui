import { useEffect, useRef, useState } from "react";
import Minimal from "../../components/templates/Minimal";
import Classic from "../../components/templates/Classic";
import Modern from "../../components/templates/Modern";
import { useResume } from "../../context/resume/ResumeContext";
import Spinner from "../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import Select from "../../components/form/Select";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

const PrintableResume = () => {
  const { t } = useTranslation();
  const { resume } = useResume();
  const [template, setTemplate] = useState<"minimal" | "classic" | "modern">(
    "classic",
  );
  const [preview, setPreview] = useState<ResumePreview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const componentRef = useRef<HTMLDivElement>(null);

  const getResumePreview = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/resume/${resume?._id}/preview?template=${template}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const result: ResumePreviewResponse = await res.json();
      if (!result.success) {
        setError(result.message);
        return;
      }
      setPreview(result.data || null);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (resume?._id) getResumePreview();
  }, [resume?._id, template]);

  useEffect(() => {
    const savedTemplate = localStorage.getItem("resume_template") as
      | "minimal"
      | "classic"
      | "modern";
    if (savedTemplate) setTemplate(savedTemplate);
  }, []);

  const handleTemplateChange = (value: "minimal" | "classic" | "modern") => {
    setTemplate(value);
    localStorage.setItem("resume_template", value);
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: preview?.title || "resume",
  });

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!preview) return <p>{t("no_resume_found")}</p>;

  return (
    <div className="p-6 relative">
      <div className="flex items-center justify-between absolute right-6 left-6 -top-6">
        <Select
          name="template"
          value={template}
          onChange={(e) => handleTemplateChange(e.target.value as any)}
        >
          <option value="minimal">{t("minimal_template")}</option>
          <option value="classic">{t("classic_template")}</option>
          <option value="modern">{t("modern_template")}</option>
        </Select>

        <button
          className="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          onClick={handlePrint}
        >
          {t("print_save_pdf")}
        </button>
      </div>

      <div
        ref={componentRef}
        className="bg-white p-5 text-gray-800 shadow-md max-w-7xl mx-auto mt-5 print:max-w-full print:p-4"
      >
        {template === "minimal" && preview && <Minimal preview={preview} />}
        {template === "classic" && preview && <Classic preview={preview} />}
        {template === "modern" && preview && <Modern preview={preview} />}
      </div>
    </div>
  );
};

export default PrintableResume;
