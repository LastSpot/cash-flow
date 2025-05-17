"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

interface MonthYearFilterProps<TData> {
  table: Table<TData>;
  data: TData[];
}

export function MonthYearFilter<TData>({ table }: MonthYearFilterProps<TData>) {
  // Extract unique years from data
  // const years = Array.from(
  //   new Set(
  //     (data as any[]).map((item) => item.date?.split("-")[0]).filter(Boolean)
  //   )
  // )
  //   .sort()
  //   .reverse();

  // All months with labels
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  // Get the current filter values
  // const dateFilter = (table.getColumn("date")?.getFilterValue() as {
  //   month: string;
  //   year: string;
  // }) || { month: "all", year: "all" };
  const dateFilter = (table.getColumn("date")?.getFilterValue() as {
    month: string;
  }) || { month: "all" };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2 h-8 flex">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Date Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[220px]">
        <DropdownMenuLabel>Filter by date</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>
                Month:{" "}
                {dateFilter.month === "all"
                  ? "All Months"
                  : months.find((m) => m.value === dateFilter.month)?.label ||
                    "All Months"}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={dateFilter.month}
                onValueChange={(value) => {
                  table.getColumn("date")?.setFilterValue({
                    ...dateFilter,
                    month: value,
                  });
                }}
              >
                <DropdownMenuRadioItem value="all">
                  All Months
                </DropdownMenuRadioItem>
                {months.map((month) => (
                  <DropdownMenuRadioItem key={month.value} value={month.value}>
                    {month.label}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        {/* <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <span>
                Year:{" "}
                {dateFilter.year === "all" ? "All Years" : dateFilter.year}
              </span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={dateFilter.year}
                onValueChange={(value) => {
                  table.getColumn("date")?.setFilterValue({
                    ...dateFilter,
                    year: value,
                  });
                }}
              >
                <DropdownMenuRadioItem value="all">
                  All Years
                </DropdownMenuRadioItem>
                {years.map((year) => (
                  <DropdownMenuRadioItem key={year} value={year}>
                    {year}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup> */}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            table.getColumn("date")?.setFilterValue({
              month: "all",
              // year: "all",
            });
          }}
        >
          Reset Filters
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
