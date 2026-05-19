import UserProfileMenu from "../../components/UserProfileMenu";

const Header = () => {
  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <h1 className="font-semibold text-lg">Admin Panel</h1>

      <UserProfileMenu />
    </header>
  );
};

export default Header;
