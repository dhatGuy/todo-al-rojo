import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orpc } from "@/orpc/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  image: string | null;
  chips: number;
  level: number;
  levelName: string;
  earnedChips: number;
  isCurrentUser?: boolean;
}

interface RankingTableProps {
  timePeriod?: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export function RankingTable({
  timePeriod = "semanal",
  currentPage = 1,
  onPageChange,
}: RankingTableProps) {
  const columnHelper = createColumnHelper<LeaderboardUser>();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor("rank", {
        id: "rank",
        cell: ({ getValue }) => (
          <div className="min-w-6">
            <p className="text-left text-[#535587]">{getValue()}</p>
          </div>
        ),
        header: () => "#",
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor("name", {
        id: "avatar",
        header: () => "Avatar",
        footer: (props) => props.column.id,
        cell: (info) => (
          <Avatar className="mr-auto">
            <AvatarImage
              src={
                info.row.original.image ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${info.row.original.userId}`
              }
              alt={info.getValue()}
            />
            <AvatarFallback>
              {info.getValue().charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ),
      }),
      columnHelper.accessor("name", {
        id: "user",
        header: () => "Usuario",
        footer: (props) => props.column.id,
        cell: ({ getValue, row }) => (
          <div className="flex items-center justify-start gap-2">
            <div>
              <div
                className={`text-gray-300 text-lg ${row.original.isCurrentUser ? "font-semibold" : ""}`}
              >
                {getValue()}
                {row.original.isCurrentUser && (
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Tú
                  </span>
                )}
              </div>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor("chips", {
        id: "chips",
        header: () => "Fichas Rojas",
        footer: (props) => props.column.id,
        cell: ({ getValue }) => (
          <div className="flex items-center justify-start gap-4">
            <img src="/images/rj-chips.png" alt="Chips" className="w-6 h-6" />
            <p className="text-gray-300 text-lg">
              {getValue().toLocaleString()}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("earnedChips", {
        id: "ftd",
        header: () => "FTDs",
        footer: (props) => props.column.id,
        cell: ({ getValue }) => (
          <div className="text-left text-gray-300">
            {Math.floor(getValue() / 200)}
          </div>
        ),
      }),
      columnHelper.accessor("levelName", {
        id: "insignia",
        header: () => "Insignias",
        footer: (props) => props.column.id,
        cell: ({ getValue }) => (
          <p className="text-left text-[#535587]">{getValue()}</p>
        ),
      }),
    ],
    [columnHelper.accessor],
  );

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: currentPage - 1,
    pageSize: 10,
  });

  // Update pagination when currentPage changes
  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: currentPage - 1 }));
  }, [currentPage]);

  // Convert time period to leaderboard type
  const getLeaderboardType = (period: string) => {
    switch (period) {
      case "Diario":
        return "chips" as const;
      case "Semanal":
        return "chips" as const;
      case "Mensual":
        return "chips" as const;
      default:
        return "chips" as const;
    }
  };

  // Convert time period to timeframe
  const getTimeframe = (period: string) => {
    switch (period) {
      case "Diario":
        return "weekly" as const; // Using weekly as closest to daily
      case "Semanal":
        return "weekly" as const;
      case "Mensual":
        return "monthly" as const;
      default:
        return "all_time" as const;
    }
  };

  const dataQuery = useQuery(
    orpc.leaderboard.get.queryOptions({
      input: {
        type: getLeaderboardType(timePeriod),
        timeframe: getTimeframe(timePeriod),
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      },
      placeholderData: keepPreviousData,
    }),
  );

  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: dataQuery.data?.entries ?? defaultData,
    columns,
    rowCount: dataQuery.data?.pagination.total,
    state: {
      pagination,
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(newPagination);
      onPageChange?.(newPagination.pageIndex + 1);
    },
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: false,
  });

  return (
    <div className="flex flex-col gap-8 mb-8">
      <div className="bg-[#111129] p-4 rounded-xl">
        <Table>
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-[#282A49]">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div className="text-[#535587] text-left min-w-10 font-bold text-lg">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  className={`border-[#282A49] ${row.original.isCurrentUser ? "bg-red-900/20" : ""}`}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="w-full flex justify-end gap-2">
        <Pagination className="w-fit mx-0">
          <PaginationContent>
            {React.useMemo(() => {
              const totalPages = table.getPageCount();
              const currentPage = table.getState().pagination.pageIndex;
              const maxVisiblePages = 4;

              // Calculate the start and end page numbers to display
              let startPage = Math.max(
                0,
                currentPage - Math.floor(maxVisiblePages / 2),
              );
              const endPage = Math.min(
                totalPages - 1,
                startPage + maxVisiblePages - 1,
              );

              // Adjust start page if we're near the end
              if (endPage - startPage < maxVisiblePages - 1) {
                startPage = Math.max(0, endPage - maxVisiblePages + 1);
              }

              const pageNumbers = [];
              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
              }

              return (
                <>
                  {/* Show first page if not in visible range */}
                  {startPage > 0 && (
                    <>
                      <PaginationItem onClick={() => table.setPageIndex(0)}>
                        <PaginationLink isActive={currentPage === 0}>
                          1
                        </PaginationLink>
                      </PaginationItem>
                      {startPage > 1 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                    </>
                  )}

                  {/* Main page numbers */}
                  {pageNumbers.map((pageIndex) => (
                    <PaginationItem
                      key={pageIndex}
                      onClick={() => table.setPageIndex(pageIndex)}
                    >
                      <PaginationLink isActive={currentPage === pageIndex}>
                        {pageIndex + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {/* Show last page if not in visible range */}
                  {endPage < totalPages - 1 && (
                    <>
                      {endPage < totalPages - 2 && (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}
                      <PaginationItem
                        onClick={() => table.setPageIndex(totalPages - 1)}
                      >
                        <PaginationLink
                          isActive={currentPage === totalPages - 1}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  {/* Next button */}
                  <PaginationItem
                    onClick={() =>
                      table.setPageIndex(
                        Math.min(
                          table.getPageCount() - 1,
                          table.getState().pagination.pageIndex + 1,
                        ),
                      )
                    }
                  >
                    <PaginationNext className="!bg-gradient-to-br from-[#D77921] to-[#FFF154]">
                      Next
                    </PaginationNext>
                  </PaginationItem>
                </>
              );
            }, [table.getPageCount, table.getState, table.setPageIndex])}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
