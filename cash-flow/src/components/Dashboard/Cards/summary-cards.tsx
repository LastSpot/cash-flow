import { YtdRevenue } from "@/components/Dashboard/Cards/ytd-revenue";
import { YtdExpense } from "@/components/Dashboard/Cards/ytd-expense";
import { YtdProfit } from "@/components/Dashboard/Cards/ytd-profit";
// import { CashCard } from "@/components/Dashboard/Cards/cash-card";
import { getYtdData } from "@/actions/data";

export async function SummaryCards() {
  const ytdData = await getYtdData();
  const revenueData = {
    revenue: ytdData.revenue,
    growthRate: ytdData.revenueGrowthRate,
  };
  const expenseData = {
    expenses: ytdData.expenses,
    growthRate: ytdData.expenseGrowthRate,
  };
  const profitData = {
    profit: ytdData.profit,
    growthRate: ytdData.profitGrowthRate,
  };

  return (
    // <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {/* YTD Revenue */}
      <YtdRevenue data={revenueData} />
      {/* YTD Expense */}
      <YtdExpense data={expenseData} />
      {/* YTD Profit */}
      <YtdProfit data={profitData} />
      {/* Debt */}
      {/* <CashCard /> */}
    </div>
  );
}
