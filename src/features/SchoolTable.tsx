import { Edit, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FileLink from "../components/FileLink";

interface SchoolTableProps {
  schools: School[];
  editing?: School | null;
  onEdit: (school: School) => void;
  onDelete: (id: string) => void;
}

const SchoolTable = ({
  schools,
  onEdit,
  onDelete,
  editing,
}: SchoolTableProps) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-4 text-wrap">{t("year")}</th>
            <th className="ps-4 py-4 text-wrap">{t("award")}</th>
            <th className="ps-4 py-4 text-wrap">{t("school")}</th>
            <th className="ps-4 py-4 text-wrap">{t("certification")}</th>
            <th className="ps-4 py-4 text-wrap sr-only">{t("action")}</th>
          </tr>
        </thead>

        <tbody>
          {schools.length ? (
            schools.map((school: School) => {
              const isEditing = editing?._id === school._id;

              return (
                <tr
                  key={school._id}
                  className={`odd:bg-white even:bg-gray-50 border-b ${
                    isEditing ? "bg-yellow-100" : ""
                  }`}
                >
                  <td className="py-4 text-wrap">
                    {`${school.startYear} - ${school.endYear}`}
                  </td>
                  <td className="ps-4 py-4 text-wrap">{school.award}</td>
                  <td className="ps-4 py-4 text-wrap flex flex-col -space-y-0.5">
                    <p>{school.school.name},</p>
                    <p className="italic">{school.school.location}</p>
                  </td>
                  <td className="ps-4 py-4 text-nowrap">
                    <FileLink
                      fileUrl={school.certificate}
                      label="Certificate"
                    />
                  </td>
                  <td className="ps-4 py-4 text-nowrap">
                    <div className="flex items-center space-x-5">
                      <button
                        title="Edit"
                        className="cursor-pointer hover:text-violet-600"
                        onClick={() => onEdit(school)}
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        title="Delete"
                        className="cursor-pointer hover:text-amber-700"
                        onClick={() => {
                          if (
                            confirm(
                              `Are you sure you want to delete ${school.award} at ${school.school.name}?`
                            )
                          ) {
                            onDelete(school._id!);
                          }
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5} className="py-4 text-wrap text-amber-800">
                No school qualifications have been added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SchoolTable;
