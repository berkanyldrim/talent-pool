import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import {
  graphqlClient,
  GET_COMPANY_APPLICANT_LIST,
  ApplicantListVariables,
  ApplicantListFilter,
  ApplicantListSort,
  Applicant as ApiApplicant,
} from "@/lib/api";
import { Applicant, ApplicantStatus, JobPosition } from "@/lib/types";

export const useApplicants = (
  options: {
    initialPageSize?: number;
    initialFilter?: Partial<ApplicantListFilter>;
    initialSort?: ApplicantListSort;
  } = {}
) => {
  const {
    initialPageSize = 29,
    initialFilter = {
      filterParameters: [
        {
          name: "fullName",
          operator: "contains",
          filterVariable: "",
          logicalOperator: "AND",
        },
      ],
      query: "",
      isFavoriteApplicant: false,
      jobListingId: null,
    },
    initialSort = { createdAt: "desc" },
  } = options;

  const [pageSize] = useState(initialPageSize);
  const [filter, setFilter] = useState<ApplicantListFilter>(
    initialFilter as ApplicantListFilter
  );
  const [sort, setSort] = useState<ApplicantListSort>(initialSort);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const lastRequestRef = useRef<{
    page: number;
    filter: ApplicantListFilter;
    sort: ApplicantListSort;
  } | null>(null);

  interface PageData {
    applicants: Applicant[];
    total: number;
    pages: number;
    currentPage: number;
  }

  const isRequestSame = (page: number) => {
    const lastRequest = lastRequestRef.current;
    if (!lastRequest) return false;

    return (
      lastRequest.page === page &&
      JSON.stringify(lastRequest.filter) === JSON.stringify(filter) &&
      JSON.stringify(lastRequest.sort) === JSON.stringify(sort)
    );
  };

  useEffect(() => {
    if (searchTerm !== undefined) {
      setFilter((prev) => ({
        ...prev,
        filterParameters: [
          {
            name: "fullName",
            operator: "contains",
            filterVariable: searchTerm,
            logicalOperator: "AND",
          },
        ],
        query: searchTerm,
      }));

      if (searchTerm) {
        lastRequestRef.current = null;
      }
    }
  }, [searchTerm]);

  const queryVariables = useCallback(
    (page: number): ApplicantListVariables => {
      return {
        page,
        pageSize,
        filter,
        sort,
      };
    },
    [pageSize, filter, sort]
  );

  const adaptApplicant = useCallback(
    (apiApplicant: ApiApplicant): Applicant => {
      const getStage = (stageName?: string): ApplicantStatus => {
        if (!stageName) return "Applied";
        const stageMap: { [key: string]: ApplicantStatus } = {
          New: "Applied",
          Interview: "Interview",
          Evaluation: "Evaluation",
          Offer: "Offer",
          Contacted: "Contacted",
        };
        return stageMap[stageName] || "Applied";
      };

      const getJobPosition = (jobName?: string): JobPosition => {
        if (!jobName) return "Software Engineering";

        if (jobName?.includes("Software")) return "Software Engineering";
        if (jobName?.includes("Frontend")) return "Sr. Frontend Dev.";
        if (jobName?.includes("Operations")) return "Operations";
        if (jobName?.includes("Design")) return "Design";
        if (jobName?.includes("Finance")) return "Finance";

        return "Software Engineering";
      };

      return {
        id: apiApplicant.id,
        name: `${apiApplicant.firstName} ${apiApplicant.lastName}`,
        email: apiApplicant.email,
        stage: getStage(apiApplicant.activeApplication?.stage?.name),
        rating: apiApplicant.rating || 3,
        appliedJob: getJobPosition(
          apiApplicant.activeApplication?.jobListing?.name
        ),
        hasResume: Boolean(apiApplicant.activeApplication?.resume),
        aiFitScore: apiApplicant.activeApplication?.aiFit || undefined,
        source: apiApplicant.sourceType || "LinkedIn",
        dateAdded: apiApplicant.createdAt,
      };
    },
    []
  );

  const query = useInfiniteQuery<PageData>({
    queryKey: ["applicants", filter, sort, pageSize],
    queryFn: async ({ pageParam = 1 }): Promise<PageData> => {
      if (isRequestSame(pageParam as number) && query.data) {
        const existingPage = query.data.pages.find(
          (page) => page.currentPage === pageParam
        );
        if (existingPage) return existingPage;
        return query.data.pages[query.data.pages.length - 1];
      }

      const variables = queryVariables(pageParam as number);

      try {
        lastRequestRef.current = {
          page: pageParam as number,
          filter,
          sort,
        };

        const response = await graphqlClient.request<{
          getCompanyApplicantList: {
            applicants: ApiApplicant[];
            total: number;
            pages: number;
          };
        }>(GET_COMPANY_APPLICANT_LIST, variables);

        if (query.data && (pageParam as number) > 1) {
          const existingIds = new Set<string>();
          query.data.pages.forEach((page) => {
            page.applicants.forEach((app) => existingIds.add(app.id));
          });

          const newIds = response.getCompanyApplicantList.applicants.map(
            (app) => app.id
          );
          const duplicateIds = newIds.filter((id) => existingIds.has(id));

          if (duplicateIds.length > 0) {
            console.warn(
              `Found ${duplicateIds.length} duplicate applicants in response for page ${pageParam}`
            );
          }
        }

        return {
          applicants:
            response.getCompanyApplicantList.applicants.map(adaptApplicant),
          total: response.getCompanyApplicantList.total,
          pages: response.getCompanyApplicantList.pages,
          currentPage: pageParam as number,
        };
      } catch (error) {
        console.error("GraphQL sorgu hatası:", error);
        throw error;
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const nextPage = Number(lastPageParam) + 1;

      if (nextPage > lastPage.pages) {
        return undefined;
      }

      const expectedTotal = lastPage.total;

      const uniqueApplicantsCount = new Set(
        allPages.flatMap((page) => page.applicants.map((app) => app.id))
      ).size;

      if (uniqueApplicantsCount >= expectedTotal) {
        return undefined;
      }

      return nextPage;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      const prevPage = Number(firstPageParam) - 1;
      return prevPage > 0 ? prevPage : undefined;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const applicants = useMemo(() => {
    if (!query.data?.pages) return [];

    const uniqueApplicants = new Map<string, Applicant>();

    query.data.pages.forEach((page) => {
      page.applicants.forEach((applicant) => {
        if (!uniqueApplicants.has(applicant.id)) {
          uniqueApplicants.set(applicant.id, applicant);
        }
      });
    });

    return Array.from(uniqueApplicants.values());
  }, [query.data]);

  const applyNameFilter = useCallback((name: string) => {
    setSearchTerm(name);

    lastRequestRef.current = null;
  }, []);

  const updateSort = useCallback(
    (field: string, direction: "asc" | "desc") => {
      if (!["stage", "avgRating"].includes(field)) {
        console.warn(`Sorting for ${field} is not supported`);
        return;
      }

      if (sort[field] === direction) {
        return;
      }

      setSort({ [field]: direction } as ApplicantListSort);

      lastRequestRef.current = null;
    },
    [sort]
  );

  const toggleFavoriteFilter = useCallback((showFavorites: boolean) => {
    setFilter((prev) => ({
      ...prev,
      isFavoriteApplicant: showFavorites,
    }));
  }, []);

  const filterByJob = useCallback((jobId: string | null) => {
    setFilter((prev) => ({
      ...prev,
      jobListingId: jobId,
    }));
  }, []);

  return {
    applicants,
    total: query.data?.pages[0]?.total || 0,
    pages: query.data?.pages[0]?.pages || 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    hasNextPage: query.hasNextPage,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: query.fetchNextPage,
    searchTerm,
    applyNameFilter,
    updateSort,
    filter,
    sort,
    toggleFavoriteFilter,
    filterByJob,
    refetch: query.refetch,
  };
};
