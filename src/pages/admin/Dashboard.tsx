import { useEffect, useState } from "react";
import Spinner from "../../components/ui/Spinner";
import { FileText, Users } from "lucide-react";
import { toDDMMYYYY } from "../../utility/dateFormat";
import { useTranslation } from "react-i18next";
import StatCard from "../../components/admin/StatCard";
import MessageStatsCard from "../../components/admin/MessageStatsCard";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const Dashboard = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/dashboard/stats`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setStats(result.data);
    } catch (error) {
      console.error("❌ Failed to fetch dashboard stats", error);
      setStats([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="space-y-9">
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Users"
          icon={Users}
          color="blue"
          chartColor="#3B82F6"
          stats={stats.users}
        />
        <StatCard
          title="Resumes"
          icon={FileText}
          color="purple"
          chartColor="#A855F7"
          stats={{
            ...stats.resumes,
            trend: [42, 66, 33, 67, 87, 94, 89],
          }}
        />
        <MessageStatsCard messages={stats.messages} />
      </div>

      {/* Stats Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <div className="p-3 bg-gray-50 rounded-t-lg">
            <h2 className="text-lg font-semibold text-blue-800">
              Recent Users
            </h2>
          </div>
          <table className="min-w-full table-fixed text-base text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr className="bg-stone-200">
                <th className="p-2">#</th>
                <th className="p-2">Username</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {stats.users.recent.length > 0 ? (
                stats.users.recent.map((user: any, i: number) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-gray-50 border-b border-b-gray-300 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2">
                      <a
                        href={`/admin/users/${user.username}`}
                        className="font-medium text-gray-900 hover:underline"
                      >
                        {t(user.username)}
                      </a>
                    </td>
                    <td className="p-2">
                      <a
                        href={`mailto:${user.email}`}
                        className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 truncate"
                        title={user.email}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-blue-500"
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
                        <span className="truncate">{user.email}</span>
                      </a>
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          user.role === "admin"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-2">{toDDMMYYYY(user.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2" colSpan={5}>
                    No recent users
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
          <div className="p-3 bg-gray-50 rounded-t-lg">
            <h2 className="text-lg font-semibold text-purple-800">
              Recent Resumes
            </h2>
          </div>
          <table className="min-w-full table-fixed text-base text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase bg-gray-50">
              <tr className="bg-slate-200">
                <th className="p-2">#</th>
                <th className="p-2">Title</th>
                <th className="p-2">User</th>
                <th className="p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {stats.resumes.recent.length > 0 ? (
                stats.resumes.recent.map((resume: any, i: number) => (
                  <tr
                    key={i}
                    className="odd:bg-white even:bg-gray-50 border-b border-b-gray-300 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <td className="p-2">{i + 1}</td>
                    <td className="p-2 font-medium text-gray-900">
                      <a
                        href={`/admin/resumes/${resume._id}`}
                        className="hover:underline"
                      >
                        {t(resume.title)}
                      </a>
                    </td>
                    <td className="p-2">
                      <a
                        href={`/admin/users/${resume.user.username}`}
                        className="inline-flex items-center gap-2 px-2 py-1 rounded-md text-sm font-medium text-teal-600 bg-teal-50 hover:bg-teal-100 hover:text-teal-700 transition-colors duration-200 truncate"
                        title={resume.user.username}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-teal-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5.121 17.804A9 9 0 1118.88 17.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="truncate">{resume.user.username}</span>
                      </a>
                    </td>
                    <td className="p-2">{toDDMMYYYY(resume.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2" colSpan={4}>
                    No recent resumes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
