import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const RefereeDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [referee, setReferee] = useState();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const getReferee = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/referees/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setReferee(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch referee", error);
      setReferee(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getReferee();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/referees/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/referees");
    } catch (error) {
      console.error("❌ Failed to update referee", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/referees/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/referees");
    } catch (error) {
      console.error("❌ Failed to delete referee", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;
  if (!referee) return <div>referee not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-800">
        Referee Details
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
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={formData.position || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Organization
          </label>
          <input
            type="text"
            name="organization"
            value={formData.organization || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Physical Address
          </label>
          <input
            type="text"
            name="physicalAddress"
            value={formData.physicalAddress || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
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

export default RefereeDetails;
