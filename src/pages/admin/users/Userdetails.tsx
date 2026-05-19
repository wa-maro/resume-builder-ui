import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const Userdetails = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<any>({});

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  // Fetch user details
  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/users/${username}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result: FetchResponse<any> = await res.json();
      setUser(result.data);
      setFormData(result.data); // preload form
    } catch (error) {
      console.error("❌ Failed to fetch user", error);
      setUser(undefined);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedFields: Record<string, any> = {};
      Object.keys(formData).forEach((key) => {
        if (formData[key as keyof typeof formData] !== user[key]) {
          updatedFields[key] = formData[key as keyof typeof formData];
        }
      });

      if (Object.keys(updatedFields).length === 0) {
        setLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/users/${user.username}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;

      navigate("/admin/users");
    } catch (error) {
      console.error("❌ Failed to update user", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/users/${username}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result: FetchResponse<any> = await res.json();
      if (!result.success) return;

      navigate("/admin/users"); // redirect
    } catch (error) {
      console.error("❌ Failed to delete user", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  if (!user) return <div>User not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit User</h2>

      <form onSubmit={handleUpdate} className="space-y-5">
        {/* Username */}
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            value={formData.username || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter email"
            value={formData.email || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Active (toggle style) */}
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

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
          >
            Update
          </button>
          {user.isActive && (
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

export default Userdetails;
