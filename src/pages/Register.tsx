import { Link } from "react-router-dom";
import RegisterForm from "../features/RegisterForm";

const Register = () => {
  return (
    <main className="max-w-3xl px-4 md:px-0 mx-auto py-16 pt-0 md:pt-16">
      <section className="space-y-8 bg-white p-8 shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold text-center capitalize">
          Register new account
        </h2>

        <RegisterForm />

        <div className="flex items-center space-x-1.5 mt-2">
          <p>Dont have an account?</p>
          <Link to="/login" className="text-teal-600 font-medium">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
