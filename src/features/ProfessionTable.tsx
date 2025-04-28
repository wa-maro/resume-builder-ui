import { Edit, Eye, X } from "lucide-react";

const ProfessionTable = ({ professions }: { professions: Profession[] }) => {
  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-4 text-nowrap">Year</th>
            <th className="ps-4 py-4 text-nowrap">Award</th>
            <th className="ps-4 py-4 text-nowrap">Institution</th>
            <th className="ps-4 py-4 text-nowrap">Certification</th>
            <th className="ps-4 py-4 text-nowrap">Action</th>
          </tr>
        </thead>

        <tbody>
          {professions.length ? (
            professions.map((rofession) => (
              <tr
                key={rofession._id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="py-4 text-nowrap">
                  {rofession.startYear.slice(3)} - {rofession.endYear.slice(3)}
                </td>
                <td className="ps-4 py-4 text-nowrap">{rofession.award}</td>
                <td className="ps-4 py-4 text-nowrap flex flex-col -space-y-0.5">
                  <p className="text-nowrap">{rofession.institution.name},</p>
                  <p className="italic text-nowrap">
                    {rofession.institution.location}
                  </p>
                </td>
                <td className="ps-4 py-4 text-nowrap">
                  <button
                    title="preview"
                    className="flex space-x-2 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span className="text-xs underline decoration-dotted">
                      Certificate
                    </span>
                  </button>
                  <button
                    title="preview"
                    className="flex space-x-2 cursor-pointer"
                  >
                    <Eye size={14} />
                    <span className="text-xs underline decoration-dotted">
                      Transcript
                    </span>
                  </button>
                </td>
                <td className="ps-4 py-4 text-nowrap">
                  <div className="flex items-center space-x-5">
                    <button title="edit" className="cursor-pointer">
                      <Edit size={14} />
                    </button>
                    <button title="delete" className="cursor-pointer">
                      <X size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-4 text-rose-700">
                No professional qualification is added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProfessionTable;
