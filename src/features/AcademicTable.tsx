import { Edit, Eye, X } from "lucide-react";

const AcademicTable = ({ academics }: { academics: Academic[] }) => {
  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-4 text-wrap">Year</th>
            <th className="ps-4 py-4 text-wrap">Award</th>
            <th className="ps-4 py-4 text-wrap">School</th>
            <th className="ps-4 py-4 text-wrap">Certification</th>
            <th className="ps-4 py-4 text-wrap sr-only">Action</th>
          </tr>
        </thead>

        <tbody>
          {academics.length ? (
            academics.map((academic) => (
              <tr
                key={academic.id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="py-4 text-wrap">
                  {academic.startYear.slice(3)} - {academic.endYear.slice(3)}
                </td>
                <td className="ps-4 py-4 text-wrap">{academic.award}</td>
                <td className="ps-4 py-4 text-wrap flex flex-col -space-y-0.5">
                  <p>{academic.school.name},</p>
                  <p className="italic">{academic.school.location}</p>
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
              <td className="py-4 text-wrap text-rose-700">
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
