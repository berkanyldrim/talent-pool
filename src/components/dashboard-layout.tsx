import React, { ReactNode } from "react";
import { Sidebar } from "./sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen ">
      <Sidebar />

      {/* Main Content */}
      <div className="lg:pl-64">
        <main>{children}</main>
      </div>
    </div>
  );
}
