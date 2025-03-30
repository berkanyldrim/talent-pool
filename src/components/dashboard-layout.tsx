import React, { ReactNode, useState } from "react";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  return (
    <div className="min-h-screen">
      {/* Mobil sidebar overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobil Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-[290px] lg:hidden transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar className="h-full" />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="lg:pl-[290px]">
        <main>
          <DashboardContext.Provider value={{ openSidebar: handleOpenSidebar }}>
            {children}
          </DashboardContext.Provider>
        </main>
      </div>
    </div>
  );
}

export const DashboardContext = React.createContext({
  openSidebar: () => {},
});
