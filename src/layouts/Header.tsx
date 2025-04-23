import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import TopNavBar from "../components/TopNavBar";

const Header = () => {
  return (
    <header className="max-w-7xl mx-auto flex flex-col justify-between md:items-center md:flex-row">
      <div className="shadow p-2 md:shadow-none">
        <Logo />
      </div>

      <TopNavBar />

      <ul className="px-2 flex justify-between items-center mt-3 space-x-4 md:mt-0 md:px-0">
        <li>
          <NavLink
            to="login"
            className="border border-amber-400 rounded-lg font-medium py-1.5 px-4 text-nowrap text-center"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="register"
            className="border border-purple-400 rounded-lg font-medium py-1.5 px-4 text-nowrap text-center"
          >
            Register
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Header;
