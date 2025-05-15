"use client";

// import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", visitors: 186 },
  { month: "February", visitors: 205 },
  { month: "March", visitors: -207 },
  { month: "April", visitors: 173 },
  { month: "May", visitors: -209 },
  { month: "June", visitors: 214 },
  { month: "July", visitors: 231 },
  { month: "August", visitors: -342 },
  { month: "September", visitors: 564 },
  { month: "October", visitors: -675 },
  { month: "November", visitors: -123 },
  { month: "December", visitors: -100 },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
} satisfies ChartConfig;

export function ProfitChart() {
  return (
    <Card className="@container/cardflex w-full h-[33vh] flex flex-col">
      <CardHeader className="pb-1">
        <CardTitle>Profit Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-1">
        <div className="w-full h-full">
          <ChartContainer config={chartConfig} className="!aspect-auto h-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel hideIndicator />}
              />
              <Bar dataKey="visitors">
                <LabelList position="top" dataKey="month" fillOpacity={1} />
                {chartData.map((item) => (
                  <Cell
                    key={item.month}
                    fill={item.visitors > 0 ? "MediumSeaGreen" : "red"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div> */}
      </CardFooter>
    </Card>
  );
}
