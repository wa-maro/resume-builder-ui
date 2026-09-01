import { useEffect, useState } from "react";
import Spinner from "../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
import Pagination from "../../../components/admin/Pagination";
import SearchFilter from "../../../components/admin/SearchFilter";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const WorkExperiences = () => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const getExperiences = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/work-experiences`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result: FetchResponse<any> = await res.json();
      setExperiences(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch work experiences", error);
      setExperiences([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExperiences();
  }, []);

  const [search, setSearch] = useState("");

  const filtered = experiences.filter((ref) => {
    const searchTerm = search.toLowerCase();
    const fieldsToSearch = [
      ref.position,
      ref.company.name,
      ref.company.location,
    ];

    const matchesSearch = fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchTerm),
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
      <h2 className="text-2xl font-semibold text-cyan-800">Experiences</h2>

      <SearchFilter search={search} setSearch={setSearch} />

      <table className="min-w-full table-fixed text-sm text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-2.5 px-4"></th>
            <th className="py-2.5 px-4">Job Title</th>
            <th className="py-2.5 px-4">Company</th>
            <th className="py-2.5 px-4">Date</th>
            <th className="py-2.5 px-4">Resume</th>
          </tr>
        </thead>

        <tbody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((exp, i) => {
              return (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2.5 px-4">{i + 1}</td>
                  <td className="py-2.5 px-4">
                    <a
                      href={`/admin/sections/work-experiences/${exp._id}`}
                      className="font-medium text-gray-900"
                    >
                      {t(`${exp.position}`)}
                    </a>
                  </td>
                  <td className="py-2.5 px-4 space-x-1.5">
                    <span>{exp.company.name}, </span>
                    <span>{exp.company.location}</span>
                  </td>
                  <td className="py-2.5 px-4 flex items-center space-x-1.5">
                    <span>{exp.startDate}</span>
                    <span>-</span>
                    <span>
                      {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <a href={`/admin/resumes/${exp.resume._id}`}>
                      {t(`${exp.resume.title}`)}
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="py-2.5 px-4 text-amber-800">
                No work experiences have been added yet
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

export default WorkExperiences;
