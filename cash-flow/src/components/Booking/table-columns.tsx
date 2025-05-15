"use client";

import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./column-header";
import { Data } from "@/actions/data";
import Link from "next/link";

// Define the date filter function
const dateFilterFn: FilterFn<any> = (row, columnId, value) => {
  if (!value || (value.month === "all" && value.year === "all")) return true;

  const dateStr = row.getValue(columnId) as string;
  const [rowYear, rowMonth] = dateStr.split("-");

  if (value.month !== "all" && value.year !== "all") {
    return rowMonth === value.month && rowYear === value.year;
  } else if (value.month !== "all") {
    return rowMonth === value.month;
  } else if (value.year !== "all") {
    return rowYear === value.year;
  }

  return true;
};

const categoryFilterFn: FilterFn<any> = (row, columnId, value) => {
  if (!value || value === "all") return true;
  const category = row.getValue(columnId) as string;
  return category === value;
};

export const columns: ColumnDef<Data>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    filterFn: dateFilterFn,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    filterFn: categoryFilterFn,
  },
  {
    accessorKey: "note",
    header: "Note",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              {/* <span className="sr-only">Open menu</span> */}
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Link href={`/dashboard/revenue/edit/${item.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <Link href={`/dashboard/revenue/${item.id}`}>
              <DropdownMenuItem>View details</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
