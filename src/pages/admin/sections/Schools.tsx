import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Spinner from "../../../components/ui/Spinner";
import Pagination from "../../../components/admin/Pagination";
import SearchFilter from "../../../components/admin/SearchFilter";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const Schools = () => {
  const { t } = useTranslation();
  const [schools, setSchools] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const getSchools = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/school-qualifications`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result: FetchResponse<any> = await res.json();
      setSchools(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch school qualifications", error);
      setSchools([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSchools();
  }, []);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = schools.filter((ref) => {
    const searchTerm = search.toLowerCase();
    const fieldsToSearch = [ref.award, ref.school.name, ref.school.location];

    const matchesSearch = fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchTerm)
    );
    const matchesFilter = filter === "" || ref.level === filter;
    return matchesSearch && matchesFilter;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <Spinner />;

  return (
    <div className="overflow-x-auto pb-5">
      <h2 className="text-2xl font-semibold text-cyan-800">Schools</h2>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        filterOptions={[
          { value: "", label: "All Levels" },
          { value: "Primary", label: "Primary" },
          { value: "O-Level", label: "O-Level" },
          { value: "A-Level", label: "A-Level" },
        ]}
      />

      <table className="min-w-full table-fixed text-sm text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-2.5 px-4"></th>
            <th className="py-2.5 px-4">Year</th>
            <th className="py-2.5 px-4">Award</th>
            <th className="py-2.5 px-4">Level</th>
            <th className="py-2.5 px-4">School</th>
          </tr>
        </thead>

        <tbody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((ac, i) => {
              return (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2.5 px-4">{i + 1}</td>
                  <td className="py-2.5 px-4">
                    {ac.startYear} - {ac.endYear}
                  </td>
                  <td className="py-2.5 px-4">
                    <a
                      href={`/admin/sections/school-qualifications/${ac._id}`}
                      className="font-medium text-gray-900"
                    >
                      {t(`${ac.award}`)}
                    </a>
                  </td>
                  <td className="py-2.5 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full capitalize
                      ${
                        ac.level === "Primary"
                          ? "bg-blue-100 text-blue-700"
                          : ac.level === "O-Level"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {ac.level}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">{ac.school.name}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="py-2.5 px-4 text-amber-800">
                No school qualifications have been added yet
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

export default Schools;
