import { useState } from "react";
import { Header } from "./header";
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

export function TalentPoolHeader() {
  const [open, setOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

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
    <div className="mb-6">
      <Header
        title="Talent Pool"
        description="Keep track of the applicants"
        action={{
          label: "Add Talent",
          onClick: () => setOpen(true),
        }}
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Talent</SheetTitle>
            <SheetDescription>
              Add a new candidate to your talent pool.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            {/* Form would go here */}
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
