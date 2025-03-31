import { useState, useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Menu } from "lucide-react";
import { DashboardContext } from "./dashboard-layout";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

interface HeaderProps {
  count?: number;
}

export function Header({ count = 0 }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const { openSidebar } = useContext(DashboardContext);
  const { user, logout } = useAuth();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800  ">
      {/* Mobile Top Row */}
      <div className="flex items-center justify-between px-4 h-14 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={openSidebar}
          className="lg:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-5 w-5 text-[#344054]" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open user menu</span>
              <div className="rounded-full overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt={`${user?.firstName} ${user?.lastName}`}
                  className="h-8 w-8 object-cover"
                />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem role="menuitem">Your Profile</DropdownMenuItem>
            <DropdownMenuItem role="menuitem">Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              role="menuitem"
              onClick={logout}
              className="text-red-500 focus:bg-red-50 dark:focus:bg-red-950 focus:text-red-600 dark:focus:text-red-400"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-[30px] font-semibold">Talent Pool</h1>
              <div className="flex items-center justify-center bg-gray-100 dark:bg-zinc-600 rounded-full w-10 h-8">
                <span className="text-base">{count}</span>
              </div>
            </div>
            <p className="text-base text-gray-500">
              Keep track of the applicants
            </p>
          </div>
          <div className="md:w-auto w-full">
            <Button
              onClick={() => setOpen(true)}
              className="w-full md:w-auto bg-black text-white hover:bg-black/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Talent
            </Button>
          </div>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Talent</SheetTitle>
            <SheetDescription>
              Add a new candidate to your talent pool.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <p className="text-sm text-gray-500">Form placeholder</p>
          </div>
        </SheetContent>
      </Sheet>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
