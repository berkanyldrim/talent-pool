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

interface TalentPoolHeaderProps {
  count?: number;
}

export function TalentPoolHeader({ count = 0 }: TalentPoolHeaderProps) {
  const [open, setOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const { openSidebar } = useContext(DashboardContext);

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
    <div className="mb-6 border-b border-gray-200 dark:border-zinc-800 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={openSidebar}
              className="mr-1 lg:hidden"
              aria-label="Open Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-[30px] font-bold">Talent Pool</h1>
            <div className="flex items-center justify-center bg-gray-100 dark:bg-zinc-600 rounded-full w-10 h-8">
              <span className="text-base">{count}</span>
            </div>
          </div>
          <div className="text-base text-gray-500">
            Keep track of the applicants
          </div>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Talent
        </Button>
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
