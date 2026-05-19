import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TemplatePreviewCard = ({ temp }: { temp: string }) => {
  const { slug } = useParams();
  const { t } = useTranslation();

  return (
    <li className="border border-gray-100 rounded-lg p-4 shadow-lg mb-6 bg-white space-y-4 list-none">
      <div className="h-64 bg-gray-50 flex items-center justify-center">
        <img
          src={`/screenshots/${temp}.png`}
          alt="Template preview"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {!slug && (
        <div className="flex justify-between items-center border-t border-gray-300 pt-4">
          <h4 className="text-lg text-amber-800 capitalize">{t(`${temp}`)}</h4>

          <Link
            to={`/templates/${temp}`}
            className="bg-amber-700 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-800 transition-colors duration-200"
          >
            {t("choose_this_template")}
          </Link>
        </div>
      )}
    </li>
  );
};

export default TemplatePreviewCard;
