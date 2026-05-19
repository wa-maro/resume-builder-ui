import { Edit, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const RefereeTable = ({
  references,
  onEdit,
  onDelete,
}: {
  references: Referee[];
  onEdit: (reference: Referee) => void;
  onDelete: (id: string) => Promise<void>;
}) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-4 text-nowrap">{t("full_name")}</th>
            <th className="ps-4 py-4 text-nowrap">{t("position")}</th>
            <th className="ps-4 py-4 text-nowrap">{`${t("organization")} / ${t(
              "institution"
            )}`}</th>
            <th className="ps-4 py-4 text-nowrap sr-only">{t("actions")}</th>
          </tr>
        </thead>

        <tbody>
          {references.length ? (
            references.map((referee) => (
              <tr
                key={referee._id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="py-4 text-nowrap">{referee.fullName}</td>
                <td className="ps-4 py-4 text-nowrap">{referee.position}</td>
                <td className="ps-4 py-4 text-nowrap flex flex-col -space-y-0.5">
                  <p>{referee.organization},</p>
                  <p className="italic">{referee.physicalAddress}</p>
                </td>
                <td className="py-4">
                  <div className="flex items-center space-x-4">
                    <button
                      title="Edit"
                      aria-label={`Edit ${referee.fullName}`}
                      className="cursor-pointer"
                      onClick={() => onEdit(referee)}
                    >
                      <Edit size={14} />
                    </button>
                    <button
                      title="Delete"
                      aria-label={`Delete ${referee.fullName}`}
                      className="cursor-pointer"
                      onClick={() => onDelete(referee._id ?? "")}
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
                No referee is added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RefereeTable;
