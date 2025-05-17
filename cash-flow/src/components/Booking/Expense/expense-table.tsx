import { DataTable } from "../data-table";
import { getExpenseData } from "@/actions/data";
import { columns } from "../table-columns";

export async function ExpenseTable() {
  const expenseData = await getExpenseData();

  return (
    <div>
      <h1 className="text-2xl font-bold">Expense Table</h1>
      <DataTable columns={columns} data={expenseData} />
    </div>
  );
}
