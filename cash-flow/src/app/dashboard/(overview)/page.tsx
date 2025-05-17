import { SummaryCards } from "@/components/Dashboard/Cards/summary-cards";
import { Charts } from "@/components/Dashboard/Charts/charts";

export default async function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col md:gap-6">
            <SummaryCards />
            <Charts />
          </div>
        </div>
      </div>
    </main>
  );
}
