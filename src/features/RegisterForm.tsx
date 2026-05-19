import React, { useState } from "react";
import Label from "../components/form/Label";
import TextInput from "../components/form/TextInput";
import { useAuth } from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterForm = () => {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<RegisterType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      setError(t("passwords_do_not_match"));
      return;
    }

    try {
      setLoading(true);
      await register(user);
      navigate("/login");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form method="post" onSubmit={onSubmitHandler}>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="basis-1/2 flex flex-col space-y-1.5">
          <Label
            style="block text-gray-700 mb-1 capitalize"
            htmlFor="username"
            text={t("username")}
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
            name="username"
            value={user.username}
            onChange={onChangeHandler}
          />
        </div>

        <div className="basis-1/2 flex flex-col space-y-1.5">
          <Label
            style="block text-gray-700 mb-1 capitalize"
            htmlFor="email"
            text={t("email")}
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
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
            text={t("password")}
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeHandler}
          />
        </div>

        <div className="basis-1/2 flex flex-col space-y-1.5">
          <Label
            style="block text-gray-700 mb-1 capitalize"
            htmlFor="confirmPassword"
            text={t("password_confirm")}
          />
          <TextInput
            style="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-amber-700"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={onChangeHandler}
          />
        </div>

        <div className="basis-1/2">
          <button
            type="submit"
            disabled={loading}
            className="flex justify-center cursor-pointer items-center gap-2 bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition"
          >
            {loading ? t("loading") : t("register")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
