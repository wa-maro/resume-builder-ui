import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const WorkExperienceDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [experience, setExperience] = useState();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const getExperience = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/work-experiences/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setExperience(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch work experience", error);
      setExperience(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getExperience();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangev2 = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // Split the name by dot to handle nested objects
    const keys = name.split(".");
    setFormData((prev: any) => {
      let updated = { ...prev };
      let temp = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        temp[keys[i]] = { ...temp[keys[i]] }; // create shallow copy of nested objects
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/work-experiences/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/work-experiences");
    } catch (error) {
      console.error("❌ Failed to update work experience", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/work-experiences/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/work-experiences");
    } catch (error) {
      console.error("❌ Failed to delete work experience", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!experience) return <div>Work experience not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-800">
        Experience Details
      </h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Immutable fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={formData.resume.user.username || ""}
            readOnly
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Resume Title
          </label>
          <input
            type="text"
            value={t(formData.resume.title) || ""}
            readOnly
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Editable Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={t(formData.position) || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Name
          </label>
          <input
            type="text"
            name="company.name"
            value={formData.company.name || ""}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Location
          </label>
          <input
            type="text"
            name="company.location"
            value={formData.company.location || ""}
            onChange={handleChangev2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Responsibilities
          </label>
          <textarea
            name="responsibilities"
            value={formData.responsibilities || ""}
            onChange={handleChange}
            rows={6}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="text"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        {!formData.currentlyWorking && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="text"
              name="endDate"
              value={formData.endDate || ""}
              onChange={handleChange}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            id="currentlyWorking"
            type="checkbox"
            name="currentlyWorking"
            checked={formData.currentlyWorking || false}
            onChange={(e) =>
              setFormData({ ...formData, currentlyWorking: e.target.checked })
            }
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="currentlyWorking" className="text-sm text-gray-700">
            Currently Working
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default WorkExperienceDetails;
