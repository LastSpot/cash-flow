import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDebtData } from "@/actions/data";

export async function CashCard() {
  const debtData = await getDebtData();

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>Cash</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          ${debtData.cash}
        </CardTitle>
        <div className="absolute right-4 top-4">
          {debtData.growthRate !== 0 && (
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {debtData.growthRate > 0 ? (
                <TrendingUpIcon className="size-3 text-green-500" />
              ) : (
                <TrendingDownIcon className="size-3 text-red-500" />
              )}
              {debtData.growthRate}%
            </Badge>
          )}
        </div>
      </CardHeader>
      {/* <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Steady performance <TrendingUpIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">Meets growth projections</div>
      </CardFooter> */}
    </Card>
  );
}
