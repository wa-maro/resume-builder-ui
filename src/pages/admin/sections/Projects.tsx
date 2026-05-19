import { useEffect, useState } from "react";
import Spinner from "../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
import Pagination from "../../../components/admin/Pagination";
import SearchFilter from "../../../components/admin/SearchFilter";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const getProjects = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result: FetchResponse<any> = await res.json();
      setProjects(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch projects", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  const [search, setSearch] = useState("");

  const filtered = projects.filter((ref) => {
    const searchTerm = search.toLowerCase();
    const fieldsToSearch = [ref.title, ref.description, ref.tools.toString()];

    const matchesSearch = fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchTerm)
    );
    return matchesSearch;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <Spinner />;

  return (
    <div className="overflow-x-auto pb-5">
      <h2 className="text-2xl font-semibold text-cyan-800">Projects</h2>

      <SearchFilter search={search} setSearch={setSearch} />

      <table className="min-w-full table-fixed text-sm text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-1.5 px-4">Title</th>
            <th className="py-1.5 px-4">Tools/Materials</th>
            <th className="py-1.5 px-4">Resume</th>
          </tr>
        </thead>

        <tbody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((project, i) => {
              return (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-1.5 px-4 flex items-center gap-4">
                    {project.image && (
                      <div className="w-16 h-8 overflow-hidden rounded shadow-sm">
                        <img
                          src={project.image.toString()}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <a
                      href={`/admin/sections/projects/${project._id}`}
                      className="font-medium text-gray-900 text-nowrap"
                    >
                      {t(`${project.title}`)}
                    </a>
                  </td>
                  <td className="py-1.5 px-4 space-x-1.5">
                    {project.tools.slice(0, 3).join(", ")}
                  </td>
                  <td className="py-1.5 px-4">
                    <a href={`/admin/resumes/${project.resume._id}`}>
                      {t(`${project.resume.title}`)}
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="py-1.5 px-4 text-amber-800">
                No projects have been added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Projects;
