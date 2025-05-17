import { ExpenseTable } from "@/components/Booking/Expense/expense-table";

export default async function ExpensePage() {
  return (
    <main className="flex flex-1 flex-col gap-2 p-4 pt-0">
      <ExpenseTable />
    </main>
  );
}
