import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Applicant } from "@/lib/types";
import { Star, MoreHorizontal, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export const columns: ColumnDef<Applicant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean | "indeterminate") =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className=""
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | "indeterminate") =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
        className=""
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 pl-2">
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <span className="text-sm font-medium text-gray-600">
              {row.original.name.charAt(0)}
            </span>
          </div>
          <span className="text-sm">{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    enableSorting: false,
  },
  {
    accessorKey: "stage",
    header: "Stage",
    enableSorting: true,
    cell: ({ row }) => {
      const stage = row.original.stage;

      return (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#36BFFA]"></div>
            <span className="text-gray-900 dark:text-gray-100">{stage}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </div>
      );
    },
  },
  {
    accessorKey: "aiFitScore",
    header: "AI Fit Score",
    enableSorting: false,
    cell: ({ row }) => {
      const score = row.original.aiFitScore || 0;
      let scoreColor = "text-gray-500";

      if (score >= 90) {
        scoreColor = "text-green-600";
      } else if (score >= 80) {
        scoreColor = "text-blue-600";
      } else if (score >= 70) {
        scoreColor = "text-yellow-600";
      } else {
        scoreColor = "text-red-600";
      }

      return <div className={`font-medium ${scoreColor}`}>{score}%</div>;
    },
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => {
      return <div>{row.original.source}</div>;
    },
  },
  {
    accessorKey: "rating",
    header: "Rating",
    enableSorting: true,
    cell: ({ row }) => {
      const rating = row.original.rating;
      return (
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={cn(
                i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "dateAdded",
    header: "Date Added",
    cell: ({ row }) => {
      const date = row.original.dateAdded;
      return <div>{date}</div>;
    },
  },
  {
    accessorKey: "appliedJob",
    header: "Applied Job",
    enableSorting: false,
    cell: ({ row }) => {
      const job = row.original.appliedJob;

      const badgeStyles: Record<string, string> = {
        "Software Engineering": "bg-purple-100 text-purple-800",
        "Sr. Frontend Dev.": "bg-indigo-100 text-indigo-800",
        Operations: "bg-blue-100 text-blue-800",
        Design: "bg-pink-100 text-pink-800",
        Finance: "bg-violet-100 text-violet-800",
      };

      return (
        <div className="flex items-center">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              badgeStyles[job] || "bg-gray-100 text-gray-800"
            )}
          >
            {job}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "resume",
    header: "Resume",
    enableSorting: false,
    cell: ({ row }) => {
      return row.original.hasResume ? (
        <div className="flex justify-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                <img src="/resume-icon.png" alt="Resume" className="h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[800px] p-0 border-0 shadow-xl relative"
              side="bottom"
              align="center"
              sideOffset={10}
            >
              <div
                className="fixed inset-0 bg-black/50"
                style={{ zIndex: -1 }}
              />
              <div className="bg-white rounded-lg shadow-lg overflow-hidden z-50">
                <img
                  src="/resume.png"
                  alt={`${row.original.name} özgeçmişi`}
                  className="w-full h-auto"
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>
      ) : null;
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const applicant = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(applicant.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Resume</DropdownMenuItem>
            <DropdownMenuItem>Edit Profile</DropdownMenuItem>
            <DropdownMenuItem>Send Message</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              Delete Candidate
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
