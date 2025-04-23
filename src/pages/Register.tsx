import { Link } from "react-router-dom";
import RegisterForm from "../features/RegisterForm";

const Register = () => {
  return (
    <div className="max-w-lg mx-auto px-20 py-10">
      <RegisterForm />

      <div className="text-xs flex items-center space-x-1.5 mt-2">
        <p>Dont have an account?</p>
        <Link
          to="/login"
          className="text-teal-600 font-medium underline decoration-dotted"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Register;
