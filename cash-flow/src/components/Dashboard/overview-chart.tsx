"use client";

// import { TrendingUp } from "lucide-react";
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
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 913, mobile: 213 },
  { month: "August", desktop: 765, mobile: 546 },
  { month: "September", desktop: 345, mobile: 546 },
  { month: "October", desktop: 453, mobile: 213 },
  { month: "November", desktop: 879, mobile: 657 },
  { month: "December", desktop: 677, mobile: 342 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "MediumSeaGreen",
  },
  mobile: {
    label: "Mobile",
    color: "red",
  },
} satisfies ChartConfig;

export function OverviewChart() {
  return (
    <Card className="@container/cardflex w-full h-[50vh]">
      <CardHeader>
        <CardTitle>Overview Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="w-full h-full">
          <ChartContainer config={chartConfig} className="!aspect-auto h-full">
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
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
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="var(--color-desktop)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="mobile"
                type="monotone"
                stroke="var(--color-mobile)"
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
