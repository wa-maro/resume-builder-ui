import { useState } from "react";
import TextInput from "../components/TextInput";
import Label from "../components/Label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LoginForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<LoginType>({
    usernameOrEmail: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      await login(user).finally(() => navigate("/"));
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    }
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-5">
        <div className="flex flex-col space-y-1.5">
          <Label
            style="block text-gray-700 mb-1 capitalize"
            htmlFor="usernameOrEmail"
            text="Username"
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
            name="usernameOrEmail"
            value={user.usernameOrEmail}
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label
            style="block text-gray-700 mb-1 capitalize"
            htmlFor="password"
            text="password"
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <button
            type="submit"
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition w-full"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
