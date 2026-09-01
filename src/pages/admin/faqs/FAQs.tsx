import { useEffect, useState } from "react";
import FAQForm from "../../../components/admin/FAQForm";
import Spinner from "../../../components/ui/Spinner";
import SearchFilter from "../../../components/admin/SearchFilter";
import Pagination from "../../../components/admin/Pagination";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const FAQs = () => {
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState<FAQ>({
    question: "",
    answer: "",
    order: 0,
    isActive: true,
    _id: "",
  });

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/faqs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await res.json();
      setFAQs(result.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/faqs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: formData.question,
          answer: formData.answer,
          order: Number(formData.order),
          isActive: formData.isActive,
        }),
      });
      const result = await res.json();
      console.log(result.message);

      if (result.success) {
        fetchFAQs();
        setModalOpen(false);
        setFormData({
          question: "",
          answer: "",
          order: 0,
          isActive: true,
          _id: "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const filtered = faqs.filter((ref) => {
    const searchTerm = search.toLowerCase();
    const fieldsToSearch = [ref.question, ref.answer];

    const matchesSearch = fieldsToSearch.some((field) =>
      field?.toLowerCase().includes(searchTerm),
    );

    const matchesFilter = filter === "" || ref.isActive === (filter === "true");
    return matchesSearch && matchesFilter;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  if (loading) return <Spinner />;

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-6 text-cyan-800">FAQs</h2>
        <button
          className="bg-slate-700 hover:bg-slate-800 text-slate-300 cursor-pointer px-4 py-2 rounded-md"
          onClick={() => setModalOpen(true)}
        >
          Create FAQ
        </button>
      </div>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        filterOptions={[
          { value: "", label: "All" },
          { value: "true", label: "Active" },
          { value: "false", label: "Inactive" },
        ]}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Question</th>
              <th className="py-2 px-4">Order #</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.length ? (
              paginatedItems.map((faq, i) => (
                <tr
                  key={faq._id}
                  className="odd:bg-white even:bg-gray-50 border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">
                    <a
                      href={`/admin/system/faqs/${faq._id}`}
                      className="font-medium text-gray-900"
                    >
                      {faq.question}
                    </a>
                  </td>
                  <td className="py-2 px-4">{faq.order ? faq.order : "-"}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        faq.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {faq.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-2 px-4 text-amber-800">
                  No FAQs added yet
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

      {isModalOpen && (
        <div className="absolute top-0 right-0 left-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-50">
          {/* Modal content */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-12 relative animate-fadeIn">
            {/* Close button */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg p-1 cursor-pointer"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            {/* FAQ Form */}
            <FAQForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={createFAQ}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQs;
