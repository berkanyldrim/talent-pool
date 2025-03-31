import { DashboardLayout } from "@/components/dashboard-layout";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { useApplicants } from "@/hooks/use-applicants";
import { Header } from "@/components/header";
import { useMemo } from "react";

export function Dashboard() {
  const {
    applicants,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    searchTerm,
    applyNameFilter,
    updateSort,
    sort,
  } = useApplicants({
    initialPageSize: 29,
  });

  const loadMoreData = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const handleSearch = (term: string) => {
    applyNameFilter(term);
  };

  const handleSort = (field: string, direction: "asc" | "desc") => {
    if (!["stage", "avgRating"].includes(field)) {
      return;
    }

    updateSort(field, direction);
  };

  const currentSort = useMemo(() => {
    if (!sort) return null;

    const key = Object.keys(sort)[0];
    const direction = sort[key] as "asc" | "desc";

    return { field: key, direction };
  }, [sort]);

  if (isError) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-6">
          <div className="w-full h-96 flex items-center justify-center">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium">
                An error occurred while loading data
              </h3>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6">
        <Header count={applicants.length} />

        <DataTable
          columns={columns}
          data={applicants}
          hasMore={hasNextPage}
          onLoadMore={loadMoreData}
          isLoadingMore={isFetchingNextPage}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onSort={handleSort}
          currentSort={currentSort}
        />
      </div>
    </DashboardLayout>
  );
}
