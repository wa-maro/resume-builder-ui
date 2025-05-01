import { Edit, Eye, X } from "lucide-react";

const SkillTable = ({ skills }: { skills: Skill[] }) => {
  return (
    <div className="overflow-x-auto pb-5">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-4 text-nowrap">Name</th>
            <th className="ps-4 py-4 text-nowrap">Proficiency (%)</th>
            <th className="ps-4 py-4 text-nowrap">Certification</th>
            <th className="ps-4 py-4 text-nowrap sr-only">Action</th>
          </tr>
        </thead>

        <tbody>
          {skills.length ? (
            skills.map((skill) => (
              <tr
                key={skill.id}
                className="odd:bg-white even:bg-gray-50 border-b"
              >
                <td className="py-4 text-nowrap">{skill.name}</td>
                <td className="ps-4 py-4 text-nowrap">{skill.proficiency}</td>
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
              <td className="py-4 text-nowrap text-rose-700">
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
