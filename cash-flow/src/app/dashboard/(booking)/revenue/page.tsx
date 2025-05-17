import { columns } from "@/components/Booking/table-columns";
import { DataTable } from "@/components/Booking/data-table";

import { getRevenueData } from "@/actions/data";
import { RevenueTable } from "@/components/Booking/Revenue/revenue-table";

export default async function RevenuePage() {
  // const data = await getRevenueData();

  return (
    <main className="flex flex-1 flex-col gap-2 p-4 pt-0">
      <RevenueTable />
    </main>
  );
}
