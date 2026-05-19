import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function StatusMessage({ status, setStatus }: any) {
  const { t } = useTranslation();

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null); // hide after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // cleanup on unmount
    }
  }, [status, setStatus]);

  return (
    status && (
      <div
        className={`p-2 rounded-md transition-opacity duration-500 ${
          status === "success"
            ? "text-green-600 bg-green-100"
            : "text-red-600 bg-red-100"
        }`}
      >
        {status === "success" && <p>{t("message_sent_successfully")}</p>}
        {status === "error" && <p>{t("message_failed")}</p>}
      </div>
    )
  );
}

export default StatusMessage;
