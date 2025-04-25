import { Link } from "react-router-dom";
import LoginForm from "../features/LoginForm";

const Login = () => {
  return (
    <main className="max-w-lg px-4 md:px-0 mx-auto py-16 pt-0 md:pt-16">
      <section className="space-y-8 bg-white p-8 shadow-md rounded-xl">
        <h2 className="text-2xl font-semibold text-center capitalize">
          Login to your account
        </h2>

        <LoginForm />

        <div className="text-sm flex items-center space-x-1.5 mt-2">
          <p>Already have an account?</p>
          <Link to="/register" className="text-teal-600 font-medium">
            Register
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
