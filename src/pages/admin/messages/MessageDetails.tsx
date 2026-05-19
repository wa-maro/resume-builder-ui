import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../../components/ui/Spinner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1/admin";

const MessageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState<Message>();
  const [reply, setReply] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      setMessage(result.data);
      // Only allow new reply if no reply exists
      if (!result.data.isReplied) {
        setReply("");
      }
    } catch (error) {
      console.error("❌ Failed to fetch message", error);
      setMessage(undefined);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async () => {
    if (!reply.trim()) return alert("Reply cannot be empty");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/messages/${id}/reply`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply }),
      });

      const result: FetchResponse<any> = await res.json();
      if (result.success) {
        setMessage(result.data);
        setReply("");
        alert("Reply sent and email delivered ✅");
      }
    } catch (error) {
      console.error("❌ Failed to reply", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: FetchResponse<any> = await res.json();
      if (result.success) {
        navigate("/admin/system/messages");
      }
    } catch (error) {
      console.error("❌ Failed to delete message", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessage();
  }, []);

  if (loading) return <Spinner />;
  if (!message) return <div>Message not found</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-cyan-800">
        Message Details
      </h2>

      {/* Metadata */}
      <div className="mb-6 p-4 bg-gray-50 rounded-md shadow-sm flex flex-col gap-2 text-sm text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Received:</span>
          <span>{new Date(message.createdAt ?? "").toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Last Updated:</span>
          <span>{new Date(message.updatedAt ?? "").toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Status:</span>
          {message.isReplied ? (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold flex items-center gap-1">
              ✅ Replied
            </span>
          ) : (
            <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold flex items-center gap-1">
              ❌ Pending
            </span>
          )}
        </div>
      </div>

      {/* Original message */}
      <form className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={message.name}
            readOnly
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={message.email}
            readOnly
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            value={message.message}
            readOnly
            rows={4}
            className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-gray-100"
          />
        </div>

        {/* Reply section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Reply
          </label>
          {message.isReplied ? (
            <textarea
              value={message.reply}
              readOnly
              rows={3}
              className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md bg-green-50 text-gray-700"
            />
          ) : (
            <>
              <textarea
                name="reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={3}
                className="mt-1 w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none"
                placeholder="Write your reply..."
              />
              <button
                type="button"
                onClick={handleReply}
                className="mt-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md transition"
              >
                Send Reply
              </button>
            </>
          )}
        </div>

        {/* Delete */}
        {message.isActive && (
          <div className="pt-4">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md transition"
            >
              Deactivate
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MessageDetails;
