import { Outlet } from "react-router-dom";
import Header from "./Header";

const AppLayout = () => {
  return (
    <>
      <Header />

      <div className="mt-20 max-w-7xl mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
