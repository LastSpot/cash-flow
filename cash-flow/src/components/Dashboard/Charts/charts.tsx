import { getMonthlyData } from "@/actions/data";
import { RevenueExpenseChart } from "./revenue-expense-chart";
import { ProfitChart } from "./profit-chart";

export async function Charts() {
  const monthlyData = await getMonthlyData();

  return (
    <div className="flex flex-col gap-2 px-4 lg:px-6">
      <RevenueExpenseChart data={monthlyData} />
      <ProfitChart data={monthlyData} />
    </div>
  );
}
