import { useEffect } from "react";

interface AlertProps {
  alert: Alert;
  setAlert: React.Dispatch<React.SetStateAction<Alert | undefined>>;
}

const Alert = ({ alert, setAlert }: AlertProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(undefined);
    }, 5000); 

    return () => clearTimeout(timer);
  }, [alert, setAlert]);

  if (!alert.messages || alert.messages.length === 0) return null;

  return (
    <ul className="space-y-1 flex flex-col" role="alert">
      {alert.messages.map((message, index) => (
        <li
          key={index}
          className={`py-2 px-3 rounded-md w-fit text-sm ${
            alert.success
              ? "bg-green-100 text-green-900"
              : "bg-rose-100 text-rose-900"
          }`}
        >
          {message}
        </li>
      ))}
    </ul>
  );
};

export default Alert;
