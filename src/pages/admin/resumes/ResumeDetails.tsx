import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";
import { toDDMMYYYY, toYYYDDMM } from "../../../utility/dateFormat";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const ResumeDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [resume, setResume] = useState<any>();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  // Fetch resume
  const fetchResume = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/resumes/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setResume(result.data);
      setFormData({
        ...result.data,
        declaration: {
          ...result.data.declaration,
          date: result.data.declaration?.date
            ? toYYYDDMM(result.data.declaration.date)
            : "",
        },
      });
    } catch (error) {
      console.error("❌ Failed to fetch resume", error);
      setResume(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  // Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("declaration.")) {
      const field = name.split(".")[1];
      setFormData({
        ...formData,
        declaration: {
          ...formData.declaration,
          [field]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Update resume
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        declaration: {
          ...formData.declaration,
          signature: formData.declaration?.signature ?? "",
          date: formData.declaration?.date
            ? toDDMMYYYY(formData.declaration.date)
            : "",
        },
      };

      const res = await fetch(`${API_BASE_URL}/resumes/${resume._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;

      navigate("/admin/resumes");
    } catch (error) {
      console.error("❌ Failed to update resume", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete resume
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/resumes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;

      navigate("/admin/resumes");
    } catch (error) {
      console.error("❌ Failed to delete resume", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!resume) return <div>Resume not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Resume</h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* User */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User
          </label>
          <input
            type="text"
            value={formData?.user?.username || ""}
            readOnly
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={t(formData?.title) || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Summary
          </label>
          <textarea
            name="summary"
            value={formData?.summary || ""}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Declaration Statement */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Declaration Statement
          </label>
          <textarea
            name="declaration.statement"
            value={formData?.declaration?.statement || ""}
            onChange={handleChange}
            rows={2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Declaration Signature */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Signature
          </label>
          <input
            type="text"
            name="declaration.signature"
            value={formData?.declaration?.signature || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {/* Declaration Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="declaration.date"
            value={formData?.declaration?.date || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="isActive"
            type="checkbox"
            name="isActive"
            checked={formData.isActive || false}
            onChange={(e) =>
              setFormData({ ...formData, isActive: e.target.checked })
            }
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Active
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            Update
          </button>
          {resume.isActive && (
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResumeDetails;
