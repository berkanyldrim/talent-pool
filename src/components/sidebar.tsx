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

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div
      className={cn(
        "hidden lg:flex h-screen w-64 flex-col fixed inset-y-0 z-10  border-r dark:border-zinc-800",
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
            active={false}
          />
          <NavItem
            icon={<Briefcase className="h-5 w-5" />}
            label="Jobs"
            active={false}
          />
          <NavItem
            icon={<Users className="h-5 w-5" />}
            label="Talent Pool"
            active={true}
          />
          <NavItem
            icon={<Inbox className="h-5 w-5" />}
            label="Inbox"
            active={false}
          />
        </div>

        {/* Support & Settings */}
        <div className="px-2 mb-4 space-y-1">
          <NavItem
            icon={<LifeBuoy className="h-5 w-5" />}
            label="Support"
            active={false}
          />
          <NavItem
            icon={<Settings className="h-5 w-5" />}
            label="Settings"
            active={false}
          />
        </div>

        {/* User Profile */}
        <div className="px-4 py-4 border-t dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full  overflow-hidden">
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
  active: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <div
      className={cn(
        "flex items-center px-3 py-2 rounded-md cursor-pointer",
        active
          ? "bg-gray-100 dark:bg-zinc-800"
          : "hover:bg-gray-100 dark:hover:bg-zinc-800"
      )}
    >
      <div className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400">
        {icon}
      </div>
      <span className="text-sm dark:text-white">{label}</span>
    </div>
  );
}
