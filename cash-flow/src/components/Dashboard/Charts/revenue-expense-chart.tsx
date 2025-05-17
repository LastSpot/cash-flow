"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

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
import { RevenueExpenseData } from "@/actions/data";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "MediumSeaGreen",
  },
  expenses: {
    label: "Expenses",
    color: "red",
  },
} satisfies ChartConfig;

export function RevenueExpenseChart({ data }: { data: RevenueExpenseData[] }) {
  const currentYear = new Date().getFullYear();

  return (
    <Card className="@container/cardflex w-full h-[50vh]">
      <CardHeader>
        <CardTitle>Overview Chart</CardTitle>
        <CardDescription>January - December {currentYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="w-full h-full">
          <ChartContainer config={chartConfig} className="!aspect-auto h-full">
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: 40,
                right: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  `$${new Intl.NumberFormat().format(value)}`
                }
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="revenue"
                type="monotone"
                stroke="var(--color-revenue)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="expenses"
                type="monotone"
                stroke="var(--color-expenses)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div> */}
            {/* <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing revenue - expense for 2024
            </div> */}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
