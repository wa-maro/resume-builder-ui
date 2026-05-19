import { useEffect, useState } from "react";
import Spinner from "../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";
import { Mail, MapPin, Phone } from "lucide-react";
import Pagination from "../../../components/admin/Pagination";
import SearchFilter from "../../../components/admin/SearchFilter";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const PersonalInformations = () => {
  const { t } = useTranslation();
  const [personalInfos, setPersonalInfos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const getPersonalInfos = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/personal-informations`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result: FetchResponse<any> = await res.json();
      setPersonalInfos(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch personal informations", error);
      setPersonalInfos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPersonalInfos();
  }, []);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = personalInfos.filter((ref) => {
    const searchTerm = search.toLowerCase();
    const fieldsToSearch = [ref.fullName, ref.phone, ref.email];

    const matchesSearch = fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchTerm)
    );

    const matchesFilter = filter === "" || ref.gender === filter;
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
      <h2 className="text-2xl font-semibold text-cyan-800">
        Personal Informations
      </h2>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        filterOptions={[
          { value: "", label: "All Genders" },
          { value: "female", label: "Female" },
          { value: "male", label: "Male" },
        ]}
      />

      <table className="min-w-full table-fixed text-sm text-left text-gray-500">
        <thead className="text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-2 px-4"></th>
            <th className="py-2 px-4">Full Name</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Physical Address</th>
          </tr>
        </thead>

        <tbody>
          {paginatedItems.length > 0 ? (
            paginatedItems.map((person, i) => {
              return (
                <tr
                  key={i}
                  className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">
                    <a
                      href={`/admin/sections/personal-informations/${person._id}`}
                      className="font-medium text-gray-900"
                    >
                      {t(`${person.fullName}`)}
                    </a>
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full capitalize
                      ${
                        person.gender === "male"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-pink-100 text-pink-700"
                      }`}
                    >
                      {person.gender}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-gray-700 max-w-xs">
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 truncate"
                      title={person.email}
                    >
                      <Mail className="w-3 h-3 text-blue-500" />
                      <span className="truncate">{person.email}</span>
                    </a>
                  </td>
                  <td className="py-2 px-4">
                    <a
                      href={`tel:${person.phone}`}
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors duration-200"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{person.phone}</span>
                    </a>
                  </td>
                  <td className="py-2 px-4 max-w-xs">
                    <div
                      className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-purple-50 text-purple-700 text-sm font-medium truncate"
                      title={person.physicalAddress}
                    >
                      <MapPin className="w-3 h-3 text-purple-500" />
                      <span className="truncate">{person.physicalAddress}</span>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="py-2 px-4 text-amber-800">
                No users have been added yet
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

export default PersonalInformations;
