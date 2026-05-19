import React, { useEffect, useState } from "react";

interface ImagePreviewProps {
  file?: File | string;
  className?: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ file, className }) => {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    if (typeof file === "string") {
      setPreview(file);
      return;
    }

    // file is a File
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!preview) return null;

  return (
    <img
      src={preview}
      alt="Preview"
      className={`w-32 h-32 object-cover rounded border ${className || ""}`}
    />
  );
};

export default ImagePreview;
