import { useState } from "react";
import TextInput from "../components/TextInput";
import Label from "../components/Label";

const LoginForm = () => {
  const [user, setUser] = useState<LoginType>({
    username: "",
    password: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="space-y-5">
        <div className="flex flex-col space-y-1.5">
          <Label
            style="block text-gray-700 mb-1 capitalize"
            htmlFor="username"
            text="username"
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
            name="username"
            value={user.username}
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
