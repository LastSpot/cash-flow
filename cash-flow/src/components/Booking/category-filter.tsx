"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function CategoryFilter<TData>({
  table,
  data,
}: {
  table: Table<TData>;
  data: TData[];
}) {
  // Extract unique categories from data
  const categories = [
    "all",
    ...new Set((data as any[]).map((item) => item.category)),
  ].sort();
  const currentValue =
    (table.getColumn("category")?.getFilterValue() as string) || "all";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8">
          <ListFilter className="mr-2 h-4 w-4" />
          {currentValue === "all" ? "All Categories" : currentValue}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentValue}
          onValueChange={(value) =>
            table.getColumn("category")?.setFilterValue(value)
          }
        >
          <DropdownMenuRadioItem value="all">
            All Categories
          </DropdownMenuRadioItem>
          {categories
            .filter((c) => c !== "all")
            .map((category) => (
              <DropdownMenuRadioItem key={category} value={category}>
                {category}
              </DropdownMenuRadioItem>
            ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => table.getColumn("category")?.setFilterValue("all")}
        >
          Reset Filter
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
