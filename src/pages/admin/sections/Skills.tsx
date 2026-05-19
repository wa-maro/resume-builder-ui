import { useEffect, useState } from "react";
import Spinner from "../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
import Pagination from "../../../components/admin/Pagination";
import SearchFilter from "../../../components/admin/SearchFilter";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const Skills = () => {
  const { t } = useTranslation();
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const getSkills = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/skills`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result: FetchResponse<any> = await res.json();
      setSkills(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch skills", error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = skills.filter((ref) => {
    const matchesSearch = ref.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "" || ref.category === filter;
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
      <h2 className="text-2xl font-semibold text-cyan-800">Skills</h2>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        filterOptions={[
          { value: "", label: "All Categories" },
          { value: "personal", label: "Personal" },
          { value: "professional", label: "Professional" },
        ]}
      />

      <table className="min-w-full table-fixed text-sm text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-2.5 px-4"></th>
            <th className="py-2.5 px-4">Name</th>
            <th className="py-2.5 px-4">Category</th>
            <th className="py-2.5 px-4">Description</th>
            <th className="py-2.5 px-4">proficiency</th>
          </tr>
        </thead>

        <tbody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((skill, i) => {
              return (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2.5 px-4">{i + 1}</td>
                  <td className="py-2.5 px-4">
                    <a
                      href={`/admin/sections/skills/${skill._id}`}
                      className="font-medium text-gray-900"
                    >
                      {t(`${skill.name}`)}
                    </a>
                  </td>
                  <td className="py-2.5 px-4 text-gray-700">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                        skill.category === "personal"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {skill.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <p className="line-clamp-1 max-w-xl">
                      {t(`${skill.description ?? "-"}`)}
                    </p>
                  </td>
                  <td className="py-2.5 px-4"> {skill.proficiency}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="py-2.5 px-4 text-amber-800">
                No skills have been added yet
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

export default Skills;
