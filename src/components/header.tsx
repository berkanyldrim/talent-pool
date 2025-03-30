import { MobileSidebar } from "./mobile-sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface HeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function Header({ title, description, action }: HeaderProps) {
  return (
    <div className=" border-b sticky top-0 z-10">
      <div className="flex h-16 items-center px-4 md:px-6 gap-4">
        <div className="md:hidden">
          <MobileSidebar />
        </div>

        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>

          {action && (
            <Button onClick={action.onClick}>
              <Plus className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
