import { useState } from "react";
import { NavLink } from "react-router-dom";

type NavItem = {
  label: string;
  to?: string;
  children?: NavItem[];
};

interface SideNavItemProps {
  item: NavItem;
}

const SideNavItem = ({ item }: SideNavItemProps) => {
  const [open, setOpen] = useState(true);

  if (item.children && item.children.length > 0) {
    return (
      <li>
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left px-2 py-1 text-slate-700 hover:text-rose-600 focus:outline-none"
        >
          {item.label} {open ? "−" : "+"}
        </button>
        {open && (
          <ul className="ml-4 mt-1 space-y-1">
            {item.children.map((child) => (
              <SideNavItem key={child.label} item={child} />
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={item.to!}
        className={({ isActive }) =>
          `block px-2 py-1 rounded ${
            isActive
              ? "text-rose-600 bg-rose-100"
              : "text-slate-700 hover:text-rose-600"
          }`
        }
      >
        {item.label}
      </NavLink>
    </li>
  );
};

export default SideNavItem;
