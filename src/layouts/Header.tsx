import Logo from "../components/Logo";

const Header = () => {
  return (
    <header className="max-w-7xl mx-auto flex flex-col justify-between md:items-center md:flex-row">
      <div className="shadow p-2 md:shadow-none">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
