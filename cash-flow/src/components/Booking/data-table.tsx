"use client";

import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Link from "next/link";

// Table imports
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

// UI Components
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// Custom components
import { DataTablePagination } from "./table-pagination";
import { DataTableViewOptions } from "./view-options";
import { MonthYearFilter } from "./date-filter";
import { CategoryFilter } from "./category-filter";

// Component interface
interface DataTableProps<TData extends { date: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends { date: string }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile();

  // Source filter state with debounce
  const [filterValue, setFilterValue] = useState("");

  // State for table features
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Table configuration with custom filter
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // Feature handlers
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,

    // Core model getters
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Debounced source filter
  useEffect(() => {
    const timeout = setTimeout(() => {
      table.getColumn("source")?.setFilterValue(filterValue);
    }, 400);

    return () => clearTimeout(timeout);
  }, [filterValue, table]);

  // Mobile responsiveness
  useEffect(() => {
    if (isMobile) {
      setColumnVisibility((prev) => ({
        ...prev,
        note: false,
      }));
    } else {
      setColumnVisibility((prev) => ({
        ...prev,
        note: true,
      }));
    }
  }, [isMobile]);

  return (
    <div>
      {/* Table controls */}
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Filter by source..."
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          className="max-w-sm hidden md:block"
        />
        <div className="ml-auto flex items-center gap-2">
          <MonthYearFilter table={table} data={data} />
          <CategoryFilter table={table} data={data} />
          <DataTableViewOptions table={table} />
          <Link href="/dashboard/create">
            <Button size="sm" className="h-8">
              Create
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
