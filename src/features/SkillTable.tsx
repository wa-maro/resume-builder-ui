import { Edit, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FileLink from "../components/FileLink";

const SkillTable = ({
  skills,
  onEdit,
  onDelete,
}: {
  skills: Skill[];
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => Promise<void>;
}) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-4 text-nowrap">{t("name")}</th>
            <th className="ps-4 py-4 text-nowrap">{t("proficiency")} (%)</th>
            <th className="ps-4 py-4 text-nowrap">{t("certification")}</th>
            <th className="ps-4 py-4 text-nowrap sr-only">{t("action")}</th>
          </tr>
        </thead>

        <tbody>
          {skills.length ? (
            skills.map((skill) => (
              <tr
                key={skill._id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="py-4 text-nowrap">{skill.name}</td>
                <td className="ps-4 py-4 text-nowrap">{skill.proficiency}</td>
                <td className="ps-4 py-4 text-nowrap">
                  <FileLink fileUrl={skill.certificate} label="Certificate" />
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-4">
                    <button
                      title="Edit"
                      aria-label={`Edit ${skill.name}`}
                      className="cursor-pointer"
                      onClick={() => onEdit(skill)}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      title="Delete"
                      aria-label={`Delete ${skill.name}`}
                      className="cursor-pointer"
                      onClick={() => onDelete(skill._id ?? "")}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 text-nowrap text-amber-800">
                No skill is added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SkillTable;
