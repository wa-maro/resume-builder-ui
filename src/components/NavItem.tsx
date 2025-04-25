import { NavLink } from "react-router-dom";

const NavItem = ({ to, label }: { to: string; label: string }) => {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "text-rose-700 hover:text-rose-600 border-b-2 border-rose-400 block mx-2 py-2 md:mx-0 md:p-0.5"
            : "block border-b-2 border-rose-50 md:border-white mx-2 py-2 md:mx-0 md:p-0.5"
        }
      >
        <span>{label}</span>
      </NavLink>
    </li>
  );
};

export default NavItem;
