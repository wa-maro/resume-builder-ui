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
      <div className="space-y-5">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="username" text="Username" />
          <TextInput
            name="username"
            value={user.username}
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="email" text="email" />
          <TextInput
            type="email"
            name="email"
            value={user.email}
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
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="passwordConfirm" text="password confirm" />
          <TextInput
            type="passwordConfirm"
            name="passwordConfirm"
            value={user.passwordConfirm}
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <button
            type="submit"
            className="bg-violet-400 hover:bg-violet-500 me-auto w-full text-gray-100 rounded py-1.5 font-medium text-sm text-center"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
