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

export function MobileSidebar() {
  const [sheetOpen, setSheetOpen] = useState(false);

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
        className="p-0 w-[280px] sm:max-w-xs  dark:border-zinc-800"
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-purple-600 rounded-md flex items-center justify-center">
                <span className="text-white text-lg font-bold">H</span>
              </div>
              <span className="font-semibold dark:text-white">Hrpanda</span>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex-1 overflow-auto py-4 px-2">
            <nav className="flex flex-col gap-1">
              <div className="px-3 py-1 text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                Dashboard
              </div>
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

              <div className="mt-4 px-3 py-1 text-xs uppercase text-gray-500 dark:text-gray-400 font-medium">
                Support & Settings
              </div>
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
            </nav>
          </div>

          {/* User Profile */}
          <div className="p-4 border-t dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
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
                  <DropdownMenuLabel>Profile</DropdownMenuLabel>
                  <DropdownMenuItem>My Profile</DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <ThemeSwitcher />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 dark:text-red-400">
                    Logout
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
  active: boolean;
}

function NavItem({ icon, label, active }: NavItemProps) {
  return (
    <div
      className={cn(
        "flex items-center px-3 py-2 rounded-md cursor-pointer",
        active
          ? "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-white"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-gray-900 dark:hover:text-white"
      )}
    >
      <div className="w-5 h-5 mr-3">{icon}</div>
      <span className="text-sm">{label}</span>
    </div>
  );
}
