import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Briefcase,
  Users,
  Inbox,
  Settings,
  LifeBuoy,
  MoreHorizontal,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <div
      className={cn(
        "h-screen w-[290px] flex-col bg-white border-r dark:bg-zinc-950 dark:border-zinc-800",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="py-2 px-4">
          <div className="flex mt-5 items-center gap-2 border rounded-md p-2 w-full h-[52px]">
            <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white text-lg font-bold">H</span>
            </div>
            <DropdownMenu onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="px-0 font-semibold flex items-center dark:text-white flex-1 justify-between"
                  aria-label="Toggle organization menu"
                >
                  <span>Hrpanda</span>
                  {isDropdownOpen ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[200px]">
                <DropdownMenuItem role="menuitem" data-testid="org-settings">
                  Organization Settings
                </DropdownMenuItem>
                <DropdownMenuItem role="menuitem" data-testid="org-billing">
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem role="menuitem" data-testid="org-switch">
                  Switch Organization
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-2 space-y-1 mt-4">
          <NavItem
            icon={<Home className="h-6 w-6 text-[#344054]" />}
            label="Overview"
            href="/overview"
            active={location.pathname === "/overview"}
          />
          <NavItem
            icon={<Briefcase className="h-6 w-6 text-[#344054]" />}
            label="Jobs"
            href="/jobs"
            active={location.pathname === "/jobs"}
          />
          <NavItem
            icon={<Users className="h-6 w-6 text-[#344054]" />}
            label="Talent Pool"
            href="/talent-pool"
            active={location.pathname.includes("/talent-pool")}
          />
          <NavItem
            icon={<Inbox className="h-6 w-6 text-[#344054]" />}
            label="Inbox"
            href="/inbox"
            active={location.pathname === "/inbox"}
          />
        </div>

        {/* Support & Settings */}
        <div className="px-2 mb-4 space-y-1">
          <NavItem
            icon={<LifeBuoy className="h-6 w-6 text-[#344054]" />}
            label="Support"
            href="/support"
            active={location.pathname === "/support"}
          />
          <NavItem
            icon={<Settings className="h-6 w-6 text-[#344054]" />}
            label="Settings"
            href="/settings"
            active={location.pathname === "/settings"}
          />
          <ThemeSwitcher showLabel={true} className="mt-1" />
        </div>

        {/* User Profile */}
        <div className="hidden lg:block px-4 py-4 border-t dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Olivia Rhye"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium dark:text-white">
                  {user?.firstName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  aria-label="Toggle user menu"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem role="menuitem" data-testid="profile">
                  Your Profile
                </DropdownMenuItem>
                <DropdownMenuItem role="menuitem" data-testid="preferences">
                  Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  role="menuitem"
                  data-testid="sign-out"
                  onClick={logout}
                  className="text-red-500 focus:bg-red-50 dark:focus:bg-red-950 focus:text-red-600 dark:focus:text-red-400"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

function NavItem({ icon, label, href, active }: NavItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center px-3 py-2 rounded-md cursor-pointer",
        active
          ? "bg-gray-100 dark:bg-zinc-800 text-[#344054] dark:text-white"
          : "text-[#344054] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-[#344054] dark:hover:text-white"
      )}
    >
      <div className="w-6 h-6 mr-3">{icon}</div>
      <span className="text-base">{label}</span>
    </Link>
  );
}
