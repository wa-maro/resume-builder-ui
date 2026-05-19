import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }: any) => {
  if (!isOpen) return null;

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: any) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Close when clicking outside
  const handleOutsideClick = (e: any) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="relative max-w-6xl w-full max-h-screen overflow-auto p-4 bg-white rounded-md shadow-lg">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-700 text-2xl font-bold hover:text-red-500"
          onClick={onClose}
        >
          ×
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
