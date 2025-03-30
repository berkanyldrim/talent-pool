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

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <div
      className={cn(
        "hidden lg:flex h-screen w-64 flex-col fixed inset-y-0 left-0 z-10 bg-white border-r dark:bg-zinc-950 dark:border-zinc-800",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="py-6 px-4 flex items-center gap-2">
          <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center">
            <span className="text-white text-lg font-bold">H</span>
          </div>
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 font-semibold flex items-center dark:text-white"
              >
                Hrpanda
                {isDropdownOpen ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuItem>Organization Settings</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Switch Organization</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 px-2 space-y-1 mt-4">
          <NavItem
            icon={<Home className="h-5 w-5" />}
            label="Overview"
            href="/"
            active={location.pathname === "/"}
          />
          <NavItem
            icon={<Briefcase className="h-5 w-5" />}
            label="Jobs"
            href="/jobs"
            active={location.pathname === "/jobs"}
          />
          <NavItem
            icon={<Users className="h-5 w-5" />}
            label="Talent Pool"
            href="/talent-pool"
            active={location.pathname.includes("/talent-pool")}
          />
          <NavItem
            icon={<Inbox className="h-5 w-5" />}
            label="Inbox"
            href="/inbox"
            active={location.pathname === "/inbox"}
          />
        </div>

        {/* Support & Settings */}
        <div className="px-2 mb-4 space-y-1">
          <NavItem
            icon={<LifeBuoy className="h-5 w-5" />}
            label="Support"
            href="/support"
            active={location.pathname === "/support"}
          />
          <NavItem
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            href="/settings"
            active={location.pathname === "/settings"}
          />
        </div>

        {/* User Profile */}
        <div className="px-4 py-4 border-t dark:border-zinc-800">
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
                  Olivia Rhye
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  oliviarhye@hrpanda.co
                </p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Your Profile</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <ThemeSwitcher />
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
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
          ? "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
      )}
    >
      <div className="w-5 h-5 mr-3">{icon}</div>
      <span className="text-sm">{label}</span>
    </Link>
  );
}
