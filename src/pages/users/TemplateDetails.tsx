import { useNavigate, useParams } from "react-router-dom";
import TemplatePreviewCard from "../../components/cards/TemplatePreviewCard";
import { useTranslation } from "react-i18next";
import Modal from "../../components/ui/Model";
import { useState } from "react";

const templateData = [
  {
    slug: "minimal",
    description: "A clean and simple template with whitespace focus.",
    features: [
      "Plenty of whitespace for readability",
      "Modern and minimal typography",
      "Sections for achievements and experience",
    ],
  },
  {
    slug: "classic",
    description: "A traditional resume layout with clear structure.",
    features: [
      "Formal and professional design",
      "Readable serif typography",
      "Chronological work experience focus",
    ],
  },
  {
    slug: "modern",
    description: "A stylish and bold template with emphasis on design.",
    features: [
      "Creative layout with accent colors",
      "Strong emphasis on skills",
      "Balanced design for ATS readability",
    ],
  },
];

const TemplateDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const template = templateData.find((item) => item.slug === slug);

  if (!template) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-5 capitalize">
          {t("template_not_found")}
        </h2>
      </div>
    );
  }

  const handleUseTemplate = (): void => {
    if (!slug) {
      navigate("/templates");
      return;
    }

    localStorage.setItem("resume_template", slug);
    navigate("/resume/preview");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-5 capitalize">
        {slug?.split("-").join(" ")}
      </h2>

      {slug && <TemplatePreviewCard temp={slug} />}

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold">{t("description")}</h3>
          <p className="text-gray-600">{template.description}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold">{t("features")}</h3>
          <ul className="list-disc list-inside text-gray-600 ms-3">
            {template.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold">{t("actions")}</h3>
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleUseTemplate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {t("use_this_template")}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              {t("preview_full_page")}
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <img
          src={`/screenshots/${slug}_full.png`}
          alt={`${slug} full preview`}
          className="w-full h-auto"
        />
      </Modal>
    </div>
  );
};

export default TemplateDetails;
