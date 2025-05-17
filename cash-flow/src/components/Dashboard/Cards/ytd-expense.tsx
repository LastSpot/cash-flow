import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export async function YtdExpense({
  data,
}: {
  data: { expenses: number; growthRate: number };
}) {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>YTD Expense</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          ${data.expenses}
        </CardTitle>
        <div className="absolute right-4 top-4">
          <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            {data.growthRate < 0 ? (
              <TrendingDownIcon className="size-3 text-green-500" />
            ) : (
              <TrendingUpIcon className="size-3 text-red-500" />
            )}
            {data.growthRate}%
          </Badge>
        </div>
      </CardHeader>
      {/* <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Down 20% this period <TrendingDownIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">Acquisition needs attention</div>
      </CardFooter> */}
    </Card>
  );
}
