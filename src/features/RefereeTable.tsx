import { Edit, X } from "lucide-react";

const RefereeTable = ({
  references,
}: {
  references: Reference[];
}) => {
  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-4">Full name</th>
            <th className="py-4">Position</th>
            <th className="py-4">Organization</th>
            <th className="py-4 sr-only">Action</th>
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
                <td className="py-4 text-nowrap">{referee.position}</td>
                <td className="py-4 text-nowrap">{referee.organization}</td>
                <td className="py-4 text-nowrap">
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
              <td className="py-4 text-nowrap text-rose-700">
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
