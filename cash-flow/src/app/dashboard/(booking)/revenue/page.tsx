import { RevenueTable } from "@/components/Booking/Revenue/revenue-table";

export default async function RevenuePage() {
  return (
    <main className="flex flex-1 flex-col gap-2 p-4 pt-0">
      <RevenueTable />
    </main>
  );
}
