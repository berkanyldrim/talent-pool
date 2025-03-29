import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
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
import { useEffect, useState } from "react";

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
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">Talent Pool</h1>
          <p className="text-gray-500 text-sm">Keep track of the applicants</p>
        </div>

        <Button
          onClick={() => setOpen(true)}
          className="bg-blue-900 hover:bg-blue-800"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
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
