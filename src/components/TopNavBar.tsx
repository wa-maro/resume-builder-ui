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
    <nav
      className="hidden items-center justify-between w-full md:flex md:w-auto md:order-1"
      id="navbar-sticky"
    >
      <ul className="flex flex-col p-4 mt-4 rounded-lg bg-rose-50 md:p-0 md:space-x-8 md:flex-row md:mt-0 md:bg-white w-full">
        {navLinks.map((link) => (
          <NavItem key={link.to} to={link.to} label={link.label} />
        ))}
      </ul>
    </nav>
  );
};

export default TopNavBar;
