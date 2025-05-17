"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "./auth";
import { z } from "zod";

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};

const dataSchema = z.object({
  id: z.string(),
  date: z.string().date(),
  source: z.string(),
  category: z.string(),
  amount: z.number(),
  note: z.string().nullish(),
});

const revenueExpenseSchema = z.object({
  month: z.string(),
  revenue: z.number(),
  expenses: z.number(),
});

const profitSchema = z.object({
  month: z.string(),
  profit: z.number(),
});

const debtSchema = z.object({
  debt: z.number(),
  growthRate: z.number(),
});

export type Data = z.infer<typeof dataSchema>;
export type RevenueExpenseData = z.infer<typeof revenueExpenseSchema>;
export type ProfitData = z.infer<typeof profitSchema>;
export type DebtData = z.infer<typeof debtSchema>;

const mockDebtData = [
  { year: 2025, debt: 5433 },
  { year: 2024, debt: 4532 },
];

const monthNumberToName = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

export const getRevenueData = async (): Promise<Data[]> => {
  const year = new Date().getFullYear();
  const targetDate = `${year}-01-01`;

  const supabase = await createClient();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("finance")
    .select("id, date, source, category, amount, note")
    .eq("user_id", user.id)
    .eq("type", "revenue")
    // .gte("date", targetDate)
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
  }

  return data || [];
};

export const getExpenseData = async (): Promise<Data[]> => {
  const supabase = await createClient();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("finance")
    .select("id, date, source, category, amount, note")
    .eq("user_id", user.id)
    .eq("type", "expense")
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
  }

  return data || [];
};

export const getMonthlyData = async () => {
  const year = new Date().getFullYear();

  const supabase = await createClient();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("monthly_summary")
    .select("month, profit, revenue, expenses")
    .eq("user_id", user.id)
    .eq("year", year)
    .order("month", { ascending: true });

  if (error) {
    console.error(error);
  }

  const monthly_data = (data || []).map((item) => {
    return {
      month: monthNumberToName[item.month as keyof typeof monthNumberToName],
      revenue: item.revenue,
      expenses: item.expenses,
      profit: item.profit,
    };
  });

  return monthly_data;
};

export const getYtdData = async () => {
  const year = new Date().getFullYear();

  const supabase = await createClient();
  const user = await getCurrentUser();

  const { data: revenueData, error: revenueError } = await supabase
    .from("yearly_profit_overview")
    .select("yearly_revenue, yearly_expenses, yearly_profit")
    .eq("user_id", user.id)
    .eq("year", year);

  if (revenueError) {
    console.error(revenueError);
  }

  const { data: revenueGrowthData, error: revenueGrowthError } = await supabase
    .from("yearly_growth_rate")
    .select("revenue_growth_rate, expense_growth_rate, profit_growth_rate")
    .eq("user_id", user.id)
    .eq("year", year);

  if (revenueGrowthError) {
    console.error(revenueGrowthError);
  }

  return {
    revenue: revenueData?.[0]?.yearly_revenue,
    expenses: revenueData?.[0]?.yearly_expenses,
    profit: revenueData?.[0]?.yearly_profit,
    revenueGrowthRate: revenueGrowthData?.[0]?.revenue_growth_rate,
    expenseGrowthRate: revenueGrowthData?.[0]?.expense_growth_rate,
    profitGrowthRate: revenueGrowthData?.[0]?.profit_growth_rate,
  };
};

export const getDebtData = async () => {
  const currentYearDebt = mockDebtData[0].debt;
  const previousYearDebt = mockDebtData[1].debt;
  const growthRate =
    ((currentYearDebt - previousYearDebt) / previousYearDebt) * 100;
  const growthRatePercentage = parseInt(growthRate.toFixed(2));

  return {
    debt: formatNumber(currentYearDebt),
    growthRate: growthRatePercentage,
  };
};
