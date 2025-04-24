import { NavLink } from "react-router-dom";
import Logo from "../components/Logo";
import TopNavBar from "../components/TopNavBar";

const Header = () => {
  const toggleNavBar = () => {
    const nav = document.getElementById("navbar-sticky");
    if (nav) nav.classList.toggle("hidden");
  };

  return (
    <header className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo />

        <div className="flex md:order-2 space-x-3 md:space-x-0">
          <NavLink
            to="login"
            className="border border-rose-700 rounded-lg font-medium py-1.5 px-4 text-center text-rose-700"
          >
            Login
          </NavLink>

          <button
            onClick={toggleNavBar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <TopNavBar />
      </div>
    </header>
  );
};

export default Header;
