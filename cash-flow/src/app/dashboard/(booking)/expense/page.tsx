import { columns } from "@/components/Booking/table-columns";
import { DataTable } from "@/components/Booking/data-table";

import { Data } from "@/actions/data";

async function getData(): Promise<Data[]> {
  // Fetch data from your API here.
  return [];
}

export default async function ExpensePage() {
  const data = await getData();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <h1 className="text-2xl font-bold">Expense Table</h1>
      <DataTable columns={columns} data={data} />
    </main>
  );
}
