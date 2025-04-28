import { Edit, X } from "lucide-react";

const WorkExperienceTable = ({
  experiences,
}: {
  experiences: Experience[];
}) => {
  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-4 text-nowrap">Date</th>
            <th className="ps-4 py-4 text-nowrap">Job Title</th>
            <th className="ps-4 py-4 text-nowrap">Company</th>
            <th className="ps-4 py-4 text-nowrap sr-only">Action</th>
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
                  {experience.startDate.slice(3)} - {experience.endDate.slice(3)}
                </td>
                <td className="ps-4 py-4 text-nowrap">{experience.jobTitle}</td>
                <td className="ps-4 py-4 text-nowrap flex flex-col -space-y-0.5">
                  <p>{experience.company.name},</p>
                  <p className="italic">{experience.company.location}</p>
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
