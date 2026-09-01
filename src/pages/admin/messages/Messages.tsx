import { useEffect, useState } from "react";
import Spinner from "../../../components/ui/Spinner";
import SearchFilter from "../../../components/admin/SearchFilter";
import Pagination from "../../../components/admin/Pagination";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/messages`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      setMessages(result.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = messages.filter((ref) => {
    const searchTerm = search.toLowerCase();
    const fieldsToSearch = [ref.name, ref.email, ref.message];

    const matchesSearch = fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchTerm),
    );

    const matchesFilter =
      filter === "" || ref.isReplied === (filter === "true");
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
      <h2 className="text-2xl font-semibold mb-6 text-cyan-800">Messages</h2>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        filterOptions={[
          { value: "", label: "All" },
          { value: "true", label: "Replied" },
          { value: "false", label: "Pending" },
        ]}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Message</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length ? (
              paginatedItems.map((sms, i) => (
                <tr
                  key={sms._id}
                  className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                >
                  {" "}
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4 text-gray-700">
                    <a
                      href={`/admin/system/messages/${sms._id}`}
                      className="text-gray-900"
                    >
                      <p className="line-clamp-1 max-w-xl">{sms.message}</p>
                    </a>
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        sms.isReplied
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {sms.isReplied ? "Replied" : "Pending"}
                    </span>
                  </td>
                  <td className="py-2 px-4">{sms.name}</td>
                  <td className="py-2 px-4 text-gray-700 max-w-xs">
                    <a
                      href={`mailto:${sms.email}`}
                      className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 truncate"
                      title={sms.email}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3 h-3 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12H8m8-4H8m2 8h4m6 0V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2z"
                        />
                      </svg>
                      <span className="truncate">{sms.email}</span>
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2 px-4 text-amber-800">
                  No Messages added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Messages;
