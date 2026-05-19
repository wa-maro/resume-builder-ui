import { Outlet, useParams } from "react-router-dom";
import TemplatePreviewCard from "../../components/cards/TemplatePreviewCard";
import { useTranslation } from "react-i18next";

const Templates = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

  const isViewingSingleTemplate = !!slug;

  return (
    <div className="p-6 bg-white">
      <h1 className="text-3xl font-bold mb-4">{t("templates")}</h1>

      {!isViewingSingleTemplate && (
        <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
          {["minimal", "classic", "modern"].map((temp, index) => (
            <TemplatePreviewCard key={index} temp={temp} />
          ))}
        </ul>
      )}

      <Outlet />
    </div>
  );
};

export default Templates;
