import React, { useRef, useState } from "react";
import { useResume } from "../context/resume/ResumeContext";

interface AvatarUploaderProps {
  avatarUrl: string; // optional callback after success
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v0";

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  avatarUrl,
}) => {
  const { resume } = useResume();
  const [avatar, setAvatar] = useState<File | string | undefined>(avatarUrl);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token is required");

  const updateAvatar = async () => {
    if (!resume?._id || !avatar) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("avatar", avatar as File); // if avatar is a File

      const res = await fetch(`${API_BASE_URL}/resume/${resume._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await res.json();

      if (!result.success) throw new Error(result.message);

      setAvatar(result.data.avatar); // backend returns the uploaded URL
    } catch (err) {
      console.error("Failed to update avatar", err);
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    if (file) setAvatar(file);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Avatar Circle */}
      <div
        className="w-24 h-24 md:w-32 md:h-32 object-cover bg-gray-200 rounded-full shrink-0 flex items-center justify-center text-gray-400 text-sm font-semibold overflow-hidden cursor-pointer relative"
        onClick={() => fileInputRef.current?.click()} // trigger file input
      >
        {typeof avatar === "string" ? (
          <img
            src={`http://localhost:8080/uploads/${avatar.toString()}`}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          "Avatar"
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {avatar && avatar !== resume?.avatar && !loading && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={updateAvatar}
        >
          {loading ? "Uploading..." : "Update Avatar"}
        </button>
      )}
    </div>
  );
};
