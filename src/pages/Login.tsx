import { Link } from "react-router-dom";
import LoginForm from "../features/LoginForm";

const Login = () => {
  return (
    <div className="max-w-lg mx-auto p-20">
      <LoginForm />

      <div className="text-xs flex items-center space-x-1.5 mt-2">
        <p>Already have an account?</p>
        <Link
          to="/register"
          className="text-teal-600 font-medium underline decoration-dotted"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
