"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  // LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
import { useIsMobile } from "@/hooks/use-mobile";

const chartConfig = {
  profit: {
    label: "Profit",
  },
} satisfies ChartConfig;

export function ProfitChart({
  data,
}: {
  data: {
    month: string;
    profit: number;
  }[];
}) {
  const currentYear = new Date().getFullYear();
  const isMobile = useIsMobile();

  return (
    <Card className="@container/cardflex w-full h-[33vh] flex flex-col">
      <CardHeader className="pb-1">
        <CardTitle>Profit Chart</CardTitle>
        <CardDescription>January - December {currentYear}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-1">
        <div className="w-full h-full">
          <ChartContainer config={chartConfig} className="!aspect-auto h-full">
            <BarChart
              accessibilityLayer
              data={data}
              barSize={isMobile ? 15 : 30}
              margin={{
                left: 40,
                right: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel hideIndicator />}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickFormatter={(value) => value.slice(0, 3)}
                tickMargin={8}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: isMobile ? 10 : 12 }}
                tickFormatter={(value) =>
                  `$${new Intl.NumberFormat().format(value)}`
                }
                tickMargin={8}
                width={40}
                domain={[
                  (dataMin: number) => Math.min(0, Math.floor(dataMin * 1.2)),
                  (dataMax: number) => Math.floor(dataMax * 1.2),
                ]}
              />
              <Bar
                dataKey="profit"
                animationDuration={500}
                animationEasing="ease-in-out"
              >
                {/* <LabelList
                  position="top"
                  dataKey="profit"
                  fillOpacity={1}
                  fontSize={isMobile ? 10 : 12}
                  offset={5}
                /> */}
                {data.map((item) => (
                  <Cell
                    key={item.month}
                    fill={item.profit > 0 ? "MediumSeaGreen" : "red"}
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
