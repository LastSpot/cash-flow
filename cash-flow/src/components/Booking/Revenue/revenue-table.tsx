import { DataTable } from "../data-table";
import { getRevenueData } from "@/actions/data";
import { columns } from "../table-columns";

export async function RevenueTable() {
  const revenueData = await getRevenueData();

  return (
    <div>
      <h1 className="text-2xl font-bold">Revenue Table</h1>
      <DataTable columns={columns} data={revenueData} />
    </div>
  );
}
