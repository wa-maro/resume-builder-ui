import { Edit, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  // Simple formatting: keep as "MMM YYYY" if stored like "Jan 2013"
  return dateStr;
};

const WorkExperienceTable = ({
  experiences,
  onEdit,
  onDelete,
}: {
  experiences: Experience[];
  onEdit: (experience: Experience) => void;
  onDelete: (id: string) => Promise<void>;
}) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-4 text-nowrap">{t("date")}</th>
            <th className="ps-4 py-4 text-nowrap">{t("job_title")}</th>
            <th className="ps-4 py-4 text-nowrap">{t("company")}</th>
            <th className="ps-4 py-4 text-nowrap sr-only">{t("action")}</th>
          </tr>
        </thead>

        <tbody>
          {experiences.length ? (
            experiences.map((experience) => (
              <tr
                key={experience._id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="py-4 text-nowrap">
                  {formatDate(experience.startDate)} -{" "}
                  {experience.currentlyWorking
                    ? "Present"
                    : formatDate(experience.endDate)}
                </td>
                <td className="ps-4 py-4 text-nowrap">
                  {t(`${experience.position}`)}
                </td>
                <td className="ps-4 py-4 text-nowrap flex flex-col -space-y-0.5">
                  <p>{experience.company.name},</p>
                  <p className="italic">{experience.company.location}</p>
                </td>
                <td className="ps-4 py-4 text-nowrap">
                  <div className="flex items-center space-x-5">
                    <button
                      title="Edit"
                      className="cursor-pointer"
                      onClick={() => onEdit(experience)}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      title="Delete"
                      className="cursor-pointer"
                      onClick={() => onDelete(experience._id ?? "")}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-amber-800 text-center">
                No work experience is added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkExperienceTable;
