import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";
import { useTranslation } from "react-i18next";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const SkillDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [skill, setSkill] = useState<any>();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0], // store the actual File
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const getSkill = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setSkill(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch skill", error);
      setSkill(undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // track only changed fields
      const changedData: Record<string, any> = {};
      (
        [
          "category",
          "name",
          "proficiency",
          "description",
          "certificate",
        ] as const
      ).forEach((key) => {
        if (JSON.stringify(formData[key]) !== JSON.stringify(skill[key])) {
          changedData[key] = formData[key];
        }
      });

      if (Object.keys(changedData).length === 0) {
        setLoading(false);
        return navigate("/admin/sections/skills");
      }

      // build FormData payload
      const payload = new FormData();

      if (changedData.category)
        payload.append("category", changedData.category);
      if (changedData.name) payload.append("name", changedData.name);
      if (changedData.proficiency)
        payload.append("proficiency", String(changedData.proficiency));
      if (changedData.description)
        payload.append("description", changedData.description);

      if (changedData.certificate && changedData.certificate instanceof File) {
        payload.append("certificate", changedData.certificate);
      }

      // send PATCH request
      const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;

      navigate("/admin/sections/skills");
    } catch (error) {
      console.error("❌ Failed to update skill", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/skills/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/skills");
    } catch (error) {
      console.error("❌ Failed to delete skill", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSkill();
  }, []);

  if (loading) return <Spinner />;
  if (!skill) return <div>skill not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-800">
        Skill Details
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
            category
          </label>
          <select
            name="category"
            value={formData.category || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          >
            <option value="personal">{t("personal")}</option>
            <option value="professional">{t("professional")}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="block text-sm font-medium text-gray-700">
            {`${t("proficiency")} (%)`}
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min={0}
              step={5}
              max={100}
              className="bg-gray-100 outline-none border border-gray-400 rounded px-2.5 py-2 text-sm flex-1"
              name="proficiency"
              id="proficiency"
              onChange={handleChange}
              value={formData.proficiency}
            />
            <p>{formData.proficiency}%</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description (if any)
          </label>
          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            rows={2}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Certificate (if any)
          </label>
          <input
            type="file"
            name="certificate"
            onChange={handleChange}
            className="mt-1 w-64 border border-gray-300 rounded-md max-w-fit cursor-pointer file:cursor-pointer file:border-0 file:py-1.5 file:px-2.5 file:mr-4 file:bg-gray-800 file:text-white"
          />
          {formData?.certificate && formData.certificate instanceof File && (
            <p className="text-sm text-gray-600 mt-1">
              Selected file: {formData.certificate.name}
            </p>
          )}
          {formData?.certificate &&
            typeof formData.certificate === "string" && (
              <a
                href={
                  formData.certificate.startsWith("http")
                    ? formData.certificate
                    : `${API_BASE_URL.replace("/api/v1/admin", "")}${
                        formData.certificate
                      }`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm mt-1 block"
              >
                View certificate
              </a>
            )}
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

export default SkillDetails;
