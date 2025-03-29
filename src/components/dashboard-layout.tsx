import React, { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex min-h-screen">
        <div className="hidden md:flex w-64 flex-col fixed inset-y-0 bg-white border-r">
          <div className="py-6 px-4 flex items-center gap-2">
            <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white text-lg font-bold">H</span>
            </div>
            <h1 className="text-lg font-bold">Hrpanda</h1>
          </div>

          <div className="flex-1 px-2 space-y-1 mt-4">
            <NavItem icon="home" label="Overview" active={false} />
            <NavItem icon="briefcase" label="Jobs" active={false} />
            <NavItem icon="users" label="Talent Pool" active={true} />
            <NavItem icon="inbox" label="Inbox" active={false} />
          </div>

          <div className="px-4 py-4 border-t">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                O
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">Olivia Rhye</p>
                <p className="text-xs text-gray-500">oliviarhye@hrpanda.co</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 md:ml-64">
          <main className="px-6 py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: string;
  label: string;
  active: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <div
      className={`flex items-center px-3 py-2 rounded-md cursor-pointer ${
        active ? "bg-gray-100" : "hover:bg-gray-100"
      }`}
    >
      <div className="w-5 h-5 mr-3">
        {icon === "home" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {icon === "briefcase" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.053 4.582 18 5.75 18 7.07v3.469c0 1.126-.694 2.191-1.83 2.54-1.952.599-4.024.921-6.17.921s-4.219-.322-6.17-.921C2.694 12.73 2 11.665 2 10.539V7.07c0-1.321.947-2.489 2.294-2.676A41.047 41.047 0 016 4.193V3.75zm6.5 0v.325a41.622 41.622 0 00-5 0V3.75c0-.69.56-1.25 1.25-1.25h2.5c.69 0 1.25.56 1.25 1.25zM10 10a1 1 0 00-1 1v.01a1 1 0 001 1h.01a1 1 0 001-1V11a1 1 0 00-1-1H10z"
              clipRule="evenodd"
            />
            <path d="M3 15.055v-.684c.126.053.255.1.39.142 2.092.642 4.313.987 6.61.987 2.297 0 4.518-.345 6.61-.987.135-.041.264-.089.39-.142v.684c0 1.347-.985 2.53-2.363 2.686a41.454 41.454 0 01-9.274 0C3.985 17.585 3 16.402 3 15.055z" />
          </svg>
        )}
        {icon === "users" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
          </svg>
        )}
        {icon === "inbox" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M1 11.27c0-.246.033-.492.099-.73l1.523-5.521A2.75 2.75 0 015.273 3h9.454a2.75 2.75 0 012.651 2.019l1.523 5.52c.066.239.099.485.099.732V15a2 2 0 01-2 2H3a2 2 0 01-2-2v-3.73zm3.068-5.852A1.25 1.25 0 015.273 4.5h9.454a1.25 1.25 0 011.205.918l1.523 5.52c.006.02.01.041.015.062H14a1 1 0 00-.86.49l-.606 1.02a1 1 0 01-.86.49H8.236a1 1 0 01-.894-.553l-.448-.894A1 1 0 006 11H2.53l.015-.062 1.523-5.52z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <span className="text-sm">{label}</span>
    </div>
  );
}
