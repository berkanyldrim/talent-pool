import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Applicant } from "@/lib/types";
import { Star, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
        className="ml-4"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean | "indeterminate") =>
          row.toggleSelected(!!value)
        }
        aria-label="Select row"
        className="ml-4"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-3 pl-2">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            {row.original.name.charAt(0)}
          </div>
          <span>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.original.stage;
      const colorMap: Record<string, string> = {
        Applied: "text-blue-600",
        Interview: "text-purple-600",
        Evaluation: "text-orange-600",
        Offer: "text-green-600",
        Contacted: "text-teal-600",
      };

      return (
        <div className="flex items-center gap-2">
          <div
            className={cn("h-2 w-2 rounded-full", {
              "bg-blue-600": stage === "Applied",
              "bg-purple-600": stage === "Interview",
              "bg-orange-600": stage === "Evaluation",
              "bg-green-600": stage === "Offer",
              "bg-teal-600": stage === "Contacted",
            })}
          ></div>
          <span className={colorMap[stage]}>{stage}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "aiFitScore",
    header: "AI Fit Score",
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
    cell: ({ row }) => {
      const job = row.original.appliedJob;

      const badgeStyles = {
        "Software Engineering":
          "bg-purple-100 text-purple-800 hover:bg-purple-800 hover:text-white",
        "Sr. Frontend Dev.":
          "bg-indigo-100 text-indigo-800 hover:bg-indigo-800 hover:text-white",
        Operations:
          "bg-blue-100 text-blue-800 hover:bg-blue-800 hover:text-white",
        Design: "bg-pink-100 text-pink-800 hover:bg-pink-800 hover:text-white",
        Finance:
          "bg-violet-100 text-violet-800 hover:bg-violet-800 hover:text-white",
      };

      return (
        <Badge
          className={cn(
            "rounded-full font-normal py-1 px-3 transition-colors duration-200",
            badgeStyles[job as keyof typeof badgeStyles]
          )}
        >
          {job}
        </Badge>
      );
    },
  },
  {
    accessorKey: "resume",
    header: "Resume",
    cell: ({ row }) => {
      return row.original.hasResume ? (
        <div className="flex ">
          <img src="/resume-icon.png" alt="Resume" className="" />
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
