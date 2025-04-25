import React, { useState } from "react";
import Label from "../components/Label";
import TextInput from "../components/TextInput";

const RegisterForm = () => {
  const [user, setUser] = useState<RegisterType>({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="basis-1/2 flex flex-col space-y-1.5">
          <Label
            style="block text-gray-700 mb-1 capitalize"
            htmlFor="username"
            text="Username"
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
            name="username"
            value={user.username}
            onChange={onChangeHandler}
          />
        </div>

        <div className="basis-1/2 flex flex-col space-y-1.5">
          <Label
            style="block text-gray-700 mb-1 capitalize"
            htmlFor="email"
            text="email"
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
            type="email"
            name="email"
            value={user.email}
            onChange={onChangeHandler}
          />
        </div>

        <div className="basis-1/2 flex flex-col space-y-1.5">
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

        <div className="basis-1/2 flex flex-col space-y-1.5">
          <Label
            style="block text-gray-700 mb-1 capitalize"
            htmlFor="passwordConfirm"
            text="password confirm"
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-rose-600"
            type="passwordConfirm"
            name="passwordConfirm"
            value={user.passwordConfirm}
            onChange={onChangeHandler}
          />
        </div>

        <div className="basis-1/2">
          <button
            type="submit"
            className="flex items-center gap-2 bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700 transition"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
