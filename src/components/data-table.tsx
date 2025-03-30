import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  Updater,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Zap,
  MoreHorizontal,
  Loader,
  Plus,
  Columns as ColumnsIcon,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  isLoading?: boolean;
  searchTerm?: string;
  onSearch?: (term: string) => void;
  onSort?: (field: string, direction: "asc" | "desc") => void;
  currentSort?: { field: string; direction: "asc" | "desc" } | null;
  onAddTalent?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  hasMore = false,
  onLoadMore,
  isLoadingMore = false,
  isLoading = false,
  searchTerm = "",
  onSearch,
  onSort,
  currentSort = null,
  onAddTalent,
}: DataTableProps<TData, TValue>) {
  const initialSorting: SortingState = currentSort
    ? [
        {
          id: mapApiFieldToColumnId(currentSort.field),
          desc: currentSort.direction === "desc",
        },
      ]
    : [];

  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    select: true,
    name: true,
    email: true,
    stage: true,
    rating: true,
    appliedJob: true,
    resume: true,
    actions: true,
    source: false,
    aiFitScore: false,
    dateAdded: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  function mapApiFieldToColumnId(apiField: string): string {
    switch (apiField) {
      case "avgRating":
        return "rating";
      case "createdAt":
        return "dateAdded";
      case "fullName":
        return "name";
      default:
        return apiField;
    }
  }

  const sortableColumns = ["stage", "rating"];

  useEffect(() => {
    if (currentSort) {
      const columnId = mapApiFieldToColumnId(currentSort.field);
      setSorting([{ id: columnId, desc: currentSort.direction === "desc" }]);
    }
  }, [currentSort]);

  const handleSortingChange = useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      const newSorting =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sorting)
          : updaterOrValue;

      if (newSorting.length > 0) {
        const field = newSorting[0].id;
        if (!sortableColumns.includes(field)) {
          console.log(`Sorting disabled for column: ${field}`);
          return;
        }
      }

      setSorting(newSorting);

      if (newSorting.length > 0 && onSort) {
        const direction = newSorting[0].desc ? "desc" : "asc";
        const field = newSorting[0].id;

        let apiField = field;
        if (field === "rating") apiField = "avgRating";

        onSort(apiField, direction);
      }
    },
    [onSort, sorting]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(localSearchTerm);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearch]);

  const observerTarget = useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: handleSortingChange,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    if (!observerTarget.current || !onLoadMore || !hasMore || isLoadingMore)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(observerTarget.current);

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [onLoadMore, hasMore, isLoadingMore]);

  const formatColumnName = (columnId: string) => {
    if (columnId === "appliedJob") return "Applied Job";
    if (columnId === "aiFitScore") return "AI Fit Score";
    if (columnId === "dateAdded") return "Date Added";

    return columnId.charAt(0).toUpperCase() + columnId.slice(1);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-end py-4 mb-2 gap-2">
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667085]" />
            <Input
              placeholder="Search..."
              value={localSearchTerm}
              onChange={handleSearchChange}
              className="pl-8 pr-4 max-w-[180px] h-10 rounded-md border"
            />
          </div>

          {/* Sort Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10"
              >
                <ArrowUpDown className="h-4 w-4 text-[#667085]" />
                <span>Sort</span>
                <ChevronDown className="h-4 w-4 ml-1 text-[#667085]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanSort() &&
                    sortableColumns.includes(column.id)
                )
                .map((column) => {
                  return (
                    <DropdownMenuItem
                      key={column.id}
                      onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                      }
                      className="cursor-pointer"
                    >
                      <span>{formatColumnName(column.id)}</span>
                      <ArrowUpDown className="ml-auto h-4 w-4" />
                    </DropdownMenuItem>
                  );
                })}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => table.resetSorting()}
                className="cursor-pointer"
              >
                Reset sorting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Columns Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10"
              >
                <ColumnsIcon className="h-4 w-4 text-[#667085]" />
                <span>Columns</span>
                <ChevronDown className="h-4 w-4 ml-1 text-[#667085]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-[220px] max-h-[400px] overflow-auto"
            >
              <div className="py-2">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <div
                        key={column.id}
                        className="flex items-center justify-between px-3 py-2"
                      >
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">
                            {formatColumnName(column.id)}
                          </span>
                        </div>
                        <Switch
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        />
                      </div>
                    );
                  })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sheet View Button */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-10"
              >
                <img
                  src="/icon.png"
                  alt="Sheet view"
                  className="h-4 w-4"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(43%) sepia(8%) saturate(1011%) hue-rotate(182deg) brightness(91%) contrast(87%)",
                  }}
                />
                <span>Sheet view</span>
                <ChevronDown className="h-4 w-4 ml-1 text-[#667085]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Table View</DropdownMenuItem>
              <DropdownMenuItem>Grid View</DropdownMenuItem>
              <DropdownMenuItem>Kanban View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* More Options */}
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4 text-[#667085]" />
          </Button>
        </div>
      </div>

      <div className="rounded-md">
        <div
          className="relative w-full overflow-auto"
          style={{ height: "calc(100vh - 300px)" }}
        >
          <Table className="w-full border-collapse">
            <TableHeader className=" ">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-gray-200 dark:border-zinc-800"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "py-3 dark:border-zinc-800 last:border-r-0 ",
                          header.column.id !== "select"
                            ? "border-r border-gray-200"
                            : "",
                          header.column.getCanSort() &&
                            sortableColumns.includes(header.id)
                            ? "cursor-pointer select-none dark:text-gray-300"
                            : "dark:text-gray-300"
                        )}
                        onClick={
                          header.column.getCanSort() &&
                          sortableColumns.includes(header.id)
                            ? header.column.getToggleSortingHandler()
                            : undefined
                        }
                        style={{
                          width:
                            header.id === "select" || header.id === "actions"
                              ? "50px"
                              : header.id === "resume"
                              ? "80px"
                              : "auto",
                          textAlign: "left",
                          paddingLeft: header.id === "select" ? "20px" : "16px",
                          paddingRight: "16px",
                        }}
                      >
                        <div
                          className={
                            header.id === "select"
                              ? "flex justify-center"
                              : "flex items-center"
                          }
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {header.column.getCanSort() &&
                            sortableColumns.includes(header.id) && (
                              <div className="ml-1">
                                {header.column.getIsSorted() === "asc" ? (
                                  <ArrowUp className="h-4 w-4" />
                                ) : header.column.getIsSorted() === "desc" ? (
                                  <ArrowDown className="h-4 w-4" />
                                ) : (
                                  <ArrowUpDown className="h-4 w-4 opacity-50" />
                                )}
                              </div>
                            )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading && data.length === 0 ? (
                Array(8)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow
                      key={`skeleton-${index}`}
                      className={cn(
                        "border-b border-gray-200 dark:border-zinc-800",
                        index === 7 ? "border-b-0" : ""
                      )}
                    >
                      {columns.map((_, cellIndex) => (
                        <TableCell
                          key={`skeleton-cell-${cellIndex}`}
                          className={cn(
                            "p-2 dark:border-zinc-800 last:border-r-0",
                            cellIndex !== 0 ? "border-r border-gray-200" : ""
                          )}
                          style={{
                            textAlign: "left",
                            paddingRight: "16px",
                          }}
                        >
                          <div>
                            <div className="h-6 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse w-3/4" />
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "border-b border-gray-200 dark:border-zinc-800",
                      row.index === table.getRowModel().rows.length - 1
                        ? "border-b-0"
                        : ""
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "py-3 px-4 dark:border-zinc-800 last:border-r-0 dark:text-white",
                          cell.column.id !== "select"
                            ? "border-r border-gray-200"
                            : ""
                        )}
                        style={{
                          width:
                            cell.column.id === "select" ||
                            cell.column.id === "actions"
                              ? "50px"
                              : cell.column.id === "resume"
                              ? "80px"
                              : "auto",
                          textAlign: "left",
                          paddingLeft: "8px",
                        }}
                      >
                        <div
                          className={
                            cell.column.id === "select"
                              ? "flex justify-center"
                              : ""
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center dark:text-white"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div ref={observerTarget} className="h-4 w-full" />

          {isLoadingMore && (
            <div className="flex justify-center items-center p-4 w-full">
              <Loader className="h-6 w-6 animate-spin mr-2 text-gray-500" />
              <p className="text-sm text-gray-500">
                Loading more candidates...
              </p>
            </div>
          )}

          {!hasMore && data.length > 0 && (
            <div className="w-full py-4 text-center">
              <p className="text-sm text-gray-500">
                You've reached the end of the list
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-start pb-2">
        <Button
          onClick={onAddTalent}
          className="flex items-center gap-2 h-10"
          variant="ghost"
        >
          <Plus className="h-4 w-4" />
          <span>Add Talent</span>
        </Button>
      </div>
    </div>
  );
}
