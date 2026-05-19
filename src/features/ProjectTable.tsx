import { Edit, X } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProjectTable = ({
  projects,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => Promise<void>;
}) => {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto pb-5">
      <table className="min-w-full table-fixed text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-4 py-2">{t("project")}</th>
            <th className="px-4 py-2">{t("description")}</th>
            <th className="px-4 py-2">{t("tools_materials")}</th>
            <th className="px-4 py-2 sr-only">"{t("actions")}"</th>
          </tr>
        </thead>

        <tbody>
          {projects.length ? (
            projects.map((project, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
              >
                {/* Title */}
                <td className="px-4 py-2 flex items-center gap-4">
                  {project.image && (
                    <div className="w-20 h-12 overflow-hidden rounded shadow-sm">
                      <img
                        src={project.image.toString()}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="font-semibold text-gray-900 text-nowrap">
                    {project.title}
                  </p>
                </td>

                {/* Description */}
                <td className="px-4 py-2 max-w-xl text-gray-700">
                  <p className="line-clamp-2">{project.description || "-"}</p>
                </td>

                {/* Tools */}
                <td className="px-4 py-2 text-gray-600 max-w-xs">
                  {project.tools?.length ? (
                    <ul className="list-disc list-inside space-y-1">
                      {project.tools.slice(0, 2).map((tool, idx) => (
                        <li key={idx} className="truncate">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "-"
                  )}
                </td>

                {/* Actions */}
                <td className="px-4 py-2">
                  <div className="flex items-center space-x-3">
                    <button
                      title="Edit"
                      aria-label={`Edit ${project.title}`}
                      className="p-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      onClick={() => onEdit(project)}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      title="Delete"
                      aria-label={`Delete ${project.title}`}
                      className="p-2 rounded hover:bg-red-100 text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                      onClick={() => onDelete(project._id ?? "")}
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-4 py-2 text-amber-800">
                No projects have been added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;
