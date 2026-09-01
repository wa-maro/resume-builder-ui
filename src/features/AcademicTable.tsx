import { Edit, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import FileLink from "../components/FileLink";

interface AcademicTableProps {
  academics: Academic[];
  onEdit: (academic: Academic) => void;
  onDelete: (id: string) => void;
  processing?: boolean; // disable buttons during API calls
}

const AcademicTable = ({
  academics,
  onEdit,
  onDelete,
  processing = false,
}: AcademicTableProps) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 w-25">{t("year")}</th>
            <th className="ps-3 py-3 w-50">{t("award")}</th>
            <th className="ps-3 py-3 w-62.5">{t("institution")}</th>
            <th className="ps-3 py-3 w-62.5">{t("certification")}</th>
            <th className="ps-3 py-3 w-20 sr-only">{t("action")}</th>
          </tr>
        </thead>

        <tbody>
          {academics.length ? (
            academics.map((academic) => (
              <tr
                key={academic._id}
                className="odd:bg-white even:bg-gray-50 border-b align-top"
              >
                <td className="py-3">
                  {academic.startYear} - {academic.endYear}
                </td>

                <td className="ps-3 py-3">{academic.award}</td>

                <td className="ps-3 py-3 whitespace-normal">
                  <p className="font-medium">{academic.institution.name}</p>
                  <p className="italic text-gray-500">
                    {academic.institution.location}
                  </p>
                </td>

                <td className="ps-3 py-3 flex flex-wrap gap-2">
                  <FileLink
                    fileUrl={academic.certificate}
                    label="Certificate"
                  />
                  <FileLink fileUrl={academic.transcript} label="Transcript" />
                </td>

                <td className="ps-3 py-3">
                  <div className="flex items-center space-x-2">
                    <button
                      title="Edit"
                      className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                      onClick={() => onEdit(academic)}
                      disabled={processing}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      title="Delete"
                      className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                      onClick={() => onDelete(academic._id!)}
                      disabled={processing}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="py-3 text-amber-800 text-center">
                No academic qualification is added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AcademicTable;
