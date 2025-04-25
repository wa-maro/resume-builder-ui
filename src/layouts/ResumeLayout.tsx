import { ReactNode } from "react";
import SideBarNav from "../components/SideBarNav";

const ResumeLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <main className="px-4 py-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <aside className="md:basis-1/4 lg:basis-1/5 bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
          <SideBarNav />
        </aside>

        <section className="flex-1 overflow-auto bg-white p-6 rounded-lg shadow-md min-h-screen">
          {/* Resume Section */}
          {children}
        </section>
      </div>
    </main>
  );
};

export default ResumeLayout;
