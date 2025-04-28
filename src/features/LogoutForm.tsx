import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LogoutForm = () => {
  const { logout } = useAuth();
  const navigate = useNavigate()

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <button type="submit">Logout</button>
    </form>
  );
};

export default LogoutForm;
