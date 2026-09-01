import { useEffect, useState } from "react";
import Spinner from "../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
import { Mail, Phone } from "lucide-react";
import Pagination from "../../../components/admin/Pagination";
import SearchFilter from "../../../components/admin/SearchFilter";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const Referees = () => {
  const { t } = useTranslation();
  const [referees, setReferees] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const getReferees = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/referees`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result: FetchResponse<any> = await res.json();
      setReferees(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch referees", error);
      setReferees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReferees();
  }, []);

  const [search, setSearch] = useState("");

  const filtered = referees.filter((ref) => {
    const searchTerm = search.toLowerCase();
    const fieldsToSearch = [
      ref.fullName,
      ref.position,
      ref.organization,
      ref.phone,
      ref.email,
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
      <h2 className="text-2xl font-semibold text-cyan-800">Referees</h2>

      <SearchFilter search={search} setSearch={setSearch} />

      <table className="min-w-full table-fixed text-sm text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Position</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
          </tr>
        </thead>

        <tbody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((referee, i) => {
              return (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">
                    <a
                      href={`/admin/sections/referees/${referee._id}`}
                      className="font-medium text-gray-900"
                    >
                      {t(`${referee.fullName}`)}
                    </a>
                  </td>
                  <td className="py-2 px-4 flex space-x-0.5">
                    <span>{referee.position} - </span>
                    <span>{referee.organization}</span>
                  </td>
                  <td className="py-2 px-4 text-gray-700 max-w-xs">
                    <a
                      href={`mailto:${referee.email}`}
                      className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 truncate"
                      title={referee.email}
                    >
                      <Mail className="w-3 h-3 text-blue-500" />
                      <span className="truncate">{referee.email}</span>
                    </a>
                  </td>
                  <td className="py-2 px-4">
                    <a
                      href={`tel:${referee.phone}`}
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors duration-200"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{referee.phone}</span>
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="py-2 px-4 text-amber-800">
                No referees have been added yet
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

export default Referees;
