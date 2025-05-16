import { OverviewChart } from "@/components/Dashboard/overview-chart";
import { ProfitChart } from "@/components/Dashboard/profit-chart";
import { OverviewCards } from "@/components/Dashboard/overview-cards";
import { getOverviewData, getProfitData } from "@/actions/data";

export default async function Dashboard() {
  const overViewData = await getOverviewData();
  const profitData = await getProfitData();
  return (
    <main className="flex flex-1 flex-col gap-4">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col md:gap-6">
            <OverviewCards />
            <div className="flex flex-col gap-2 px-4 lg:px-6">
              <OverviewChart data={overViewData} />
              <ProfitChart data={profitData} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
