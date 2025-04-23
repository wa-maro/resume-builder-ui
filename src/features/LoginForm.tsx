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
          <Label htmlFor="username" text="username" />
          <TextInput
            name="username"
            value={user.username}
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password" text="password" />
          <TextInput
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-violet-400 hover:bg-violet-500 me-auto w-full cursor-pointer text-gray-100 rounded py-1.5 font-medium text-sm text-center"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
