import NavItem from "./NavItem";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/resume", label: "Resume" },
  { to: "/templates", label: "Templates" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/contact", label: "Contact" },
];

const TopNavBar = () => {
  return (
    <nav className="p-2">
      <ul className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-3">
        {navLinks.map((link) => (
          <NavItem key={link.to} to={link.to} label={link.label} />
        ))}
      </ul>
    </nav>
  );
};

export default TopNavBar;
