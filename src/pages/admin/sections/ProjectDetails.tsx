import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [project, setProject] = useState<any>();
  const [formData, setFormData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files.length > 0) {
      const file = files[0];
      setFormData({
        ...formData,
        [name]: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const getProject = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setProject(result.data);
      setFormData(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch project", error);
      setProject(undefined);
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
        ["title", "description", "socialLinks", "tools", "image"] as const
      ).forEach((key) => {
        if (JSON.stringify(formData[key]) !== JSON.stringify(project[key])) {
          changedData[key] = formData[key];
        }
      });

      if (Object.keys(changedData).length === 0) {
        setLoading(false);
        return navigate("/admin/sections/projects");
      }

      // Build FormData payload
      const payload = new FormData();

      if (changedData.title) payload.append("title", changedData.title);
      if (changedData.description)
        payload.append("description", changedData.description);

      if (changedData.tools) {
        const tools = [
          ...new Set(
            (changedData.tools as string)
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t)
          ),
        ];
        payload.append("tools", tools.join(","));
      }

      if (changedData.socialLinks) {
        const links = [
          ...new Set(
            (changedData.socialLinks as string)
              .split(",")
              .map((s) => s.trim())
              .filter((s) => s)
          ),
        ];
        payload.append("socialLinks", links.join(","));
      }

      if (changedData.image && changedData.image instanceof File) {
        payload.append("image", changedData.image);
      }

      // Make PATCH request with FormData
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;

      navigate("/admin/sections/projects");
    } catch (error) {
      console.error("❌ Failed to update project", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;
      navigate("/admin/sections/projects");
    } catch (error) {
      console.error("❌ Failed to delete project", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  if (loading) return <Spinner />;
  if (!project) return <div>project not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-800">
        Project Details
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
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData?.description || ""}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tools
          </label>
          <input
            type="text"
            name="tools"
            value={formData.tools || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Social Links
          </label>
          <input
            type="text"
            name="socialLinks"
            value={formData.socialLinks || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Project Image
          </label>

          {/* Image preview */}
          {previewImage ? (
            <img
              src={previewImage}
              alt="New preview"
              className="h-32 w-32 object-cover rounded-md border border-gray-300"
            />
          ) : project?.image ? (
            <div>
              <img
                src={project.image}
                alt={formData.title || "Project image"}
                className="h-32 w-32 object-cover rounded-md border border-gray-300"
              />
            </div>
          ) : (
            <div className="h-32 w-32 flex items-center justify-center rounded-md border border-dashed border-gray-300 text-gray-400 text-sm">
              No image
            </div>
          )}

          {/* File input */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700 cursor-pointer"
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

export default ProjectDetails;
