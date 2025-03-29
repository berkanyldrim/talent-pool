import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Applicant } from "@/lib/types";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    accessorKey: "appliedJob",
    header: "Applied Job",
    cell: ({ row }) => {
      const job = row.original.appliedJob;
      const colorMap: Record<string, string> = {
        "Software Engineering": "bg-purple-100 text-purple-800",
        "Sr. Frontend Dev.": "bg-indigo-100 text-indigo-800",
        Operations: "bg-blue-100 text-blue-800",
        Design: "bg-pink-100 text-pink-800",
        Finance: "bg-violet-100 text-violet-800",
      };

      return (
        <Badge
          className={cn("rounded-full font-normal py-1 px-3", colorMap[job])}
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
        <div className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium w-8 text-center">
          PDF
        </div>
      ) : null;
    },
  },
];
