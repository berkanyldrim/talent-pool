import React, { useState } from "react";
import {
  Menu,
  Home,
  Briefcase,
  Users,
  Inbox,
  Settings,
  LifeBuoy,
  MoreHorizontal,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";

export function MobileSidebar() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-[290px] sm:max-w-xs dark:border-zinc-800"
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="p-4 border-b dark:border-zinc-800">
            <div className="flex items-center gap-2 border rounded-md p-2 w-full h-[52px]">
              <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white text-lg font-bold">H</span>
              </div>
              <Button
                variant="ghost"
                className="px-0 font-semibold flex items-center dark:text-white flex-1 justify-between"
              >
                <span>Hrpanda</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-auto py-4 px-2">
            <nav className="flex flex-col gap-1">
              <div className="px-3 py-1 text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                Dashboard
              </div>
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

              <div className="mt-4 px-3 py-1 text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                Support & Settings
              </div>
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
            </nav>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Kullanıcı"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium dark:text-white">
                    {user?.firstName || "Kullanıcı"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email || "kullanici@hrpanda.co"}
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
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuItem>My Profile</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
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
      </SheetContent>
    </Sheet>
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
