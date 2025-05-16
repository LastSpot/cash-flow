import { columns } from "@/components/Booking/table-columns";
import { DataTable } from "@/components/Booking/data-table";

import { getExpenseData } from "@/actions/data";

export default async function ExpensePage() {
  const data = await getExpenseData();

  return (
    <main className="flex flex-1 flex-col gap-2 p-4 pt-0">
      <h1 className="text-2xl font-bold">Expense Table</h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
