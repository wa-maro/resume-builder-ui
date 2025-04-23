import { NavLink } from "react-router-dom";

const NavItem = ({ to, label }: { to: string; label: string }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "text-gray-700 hover:text-emerald-800 transition-colors border-b-2 border-teal-600 block p-2 md:p-0.5"
            : "block border-b-2 border-white p-2 md:p-0.5"
        }
      >
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
