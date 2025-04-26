import { useAuth } from "../context/authContext";

const LogoutForm = () => {
  const { logout } = useAuth();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    await logout();
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <button type="submit">Logout</button>
    </form>
  );
};

export default LogoutForm;
