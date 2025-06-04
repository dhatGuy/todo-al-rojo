import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@repo/ui/components/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/table";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import chipImg from "../../assets/images/rj-chips.png";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { fetchData, Person } from "../../utils/fetch-data";

export function RankingTable() {
  const columnHelper = createColumnHelper<Person>();

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
      columnHelper.accessor("user.avatar", {
        id: "avatar",
        header: () => "Avatar",
        footer: (props) => props.column.id,
        cell: (info) => (
          <Avatar className="mr-auto">
            <AvatarImage
              src={info.getValue()}
              alt={info.row.original.user.name}
            />
            <AvatarFallback>
              {info.row.original.user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ),
      }),
      columnHelper.accessor("user.name", {
        id: "user",
        header: () => "Usuario",
        footer: (props) => props.column.id,
        cell: ({ getValue }) => (
          <div className="flex items-center justify-start gap-2">
            <div>
              <div className="text-white text-lg font-medium">{getValue()}</div>
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
            <img src={chipImg} alt="Chips" className="w-6 h-6" />
            <p className="text-white text-lg font-medium">{getValue()}</p>
          </div>
        ),
      }),
      columnHelper.accessor("FTD", {
        id: "ftd",
        header: () => "FTDs",
        footer: (props) => props.column.id,
        cell: ({ getValue }) => (
          <div className="text-left text-gray-100">{getValue()}</div>
        ),
      }),
      columnHelper.accessor("insignia", {
        id: "insignia",
        header: () => "Insignias",
        footer: (props) => props.column.id,
        cell: ({ getValue }) => (
          <p className="text-left text-[#535587]">{getValue()}</p>
        ),
      }),
    ],
    [],
  );

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQuery = useQuery({
    queryKey: ["data", pagination],
    queryFn: () => fetchData(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    // pageCount: dataQuery.data?.pageCount ?? -1, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
    rowCount: dataQuery.data?.rowCount, // new in v8.13.0 - alternatively, just pass in `pageCount` directly
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
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
                <TableRow key={row.id} className="border-[#282A49]">
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
              let endPage = Math.min(
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
                  {/* Previous button */}
                  {/* <PaginationItem
                    onClick={() =>
                      table.setPageIndex(
                        Math.max(0, table.getState().pagination.pageIndex - 1),
                      )
                    }
                  >
                    <PaginationPrevious>Previous</PaginationPrevious>
                  </PaginationItem> */}

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
            }, [table.getState().pagination.pageIndex, table.getPageCount()])}
          </PaginationContent>
        </Pagination>
      </div>
      {/* <pre>{JSON.stringify(pagination, null, 2)}</pre> */}
    </div>
  );
}
