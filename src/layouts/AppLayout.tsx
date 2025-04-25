import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  return (
    <div className="bg-gray-50">
      <Header />

      <div className="mt-20 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
