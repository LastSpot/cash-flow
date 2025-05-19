"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "./auth";
import { revalidatePath } from "next/cache";

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US").format(value);
};

const mockCashData = [
  { year: 2025, cash: 5433 },
  { year: 2024, cash: 4532 },
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

export const getRevenueData = async () => {
  const year = new Date().getFullYear();
  const targetDate = `${year}-01-01`;

  const supabase = await createClient();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("finance")
    .select("id, date, source, category, amount, note")
    .eq("user_id", user.id)
    .eq("type", "revenue")
    .gte("date", targetDate)
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
  }

  return data || [];
};

export const getExpenseData = async () => {
  const supabase = await createClient();
  const user = await getCurrentUser();

  const year = new Date().getFullYear();
  const targetDate = `${year}-01-01`;

  const { data, error } = await supabase
    .from("finance")
    .select("id, date, source, category, amount, note")
    .eq("user_id", user.id)
    .eq("type", "expense")
    .gte("date", targetDate)
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
  }

  return data || [];
};

export const getMonthlyData = async (year?: number) => {
  const targetYear = year || new Date().getFullYear();

  const supabase = await createClient();
  const user = await getCurrentUser();

  const { data, error } = await supabase
    .from("monthly_summary")
    .select("month, profit, revenue, expenses")
    .eq("user_id", user.id)
    .eq("year", targetYear)
    .order("month", { ascending: true });

  if (error) {
    console.error(error);
  }

  if (!data || data.length === 0) {
    return [
      {
        month: "January",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "February",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "March",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "April",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "May",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "June",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "July",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "August",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "September",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "October",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "November",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
      {
        month: "December",
        revenue: 0,
        expenses: 0,
        profit: 0,
      },
    ];
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

  if (!revenueData || revenueData.length === 0) {
    return {
      revenue: 0,
      expenses: 0,
      profit: 0,
      revenueGrowthRate: 0,
      expenseGrowthRate: 0,
      profitGrowthRate: 0,
    };
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
  const currentYearDebt = mockCashData[0].cash;
  const previousYearDebt = mockCashData[1].cash;
  const growthRate =
    ((currentYearDebt - previousYearDebt) / previousYearDebt) * 100;
  const growthRatePercentage = parseInt(growthRate.toFixed(2));

  return {
    cash: formatNumber(currentYearDebt),
    growthRate: growthRatePercentage,
  };
};

export const createBooking = async (formData: FormData) => {
  const supabase = await createClient();
  const user = await getCurrentUser();

  if (
    !formData.get("date") ||
    !formData.get("type") ||
    !formData.get("source") ||
    !formData.get("category") ||
    !formData.get("amount")
  ) {
    return {
      success: false,
      error: "Please fill in all fields",
    };
  }

  console.log(formData);

  const { data, error } = await supabase.from("finance").insert({
    user_id: user.id,
    type: formData.get("type"),
    date: formData.get("date"),
    source: formData.get("source"),
    category: formData.get("category"),
    amount: formData.get("amount"),
    note: formData.get("note"),
  });

  if (error) {
    console.error(error);
    return {
      success: false,
      data: data,
      error: error,
    };
  }

  revalidatePath("/dashboard/revenue");
  revalidatePath("/dashboard/expenses");

  return {
    success: true,
    data: data,
    error: error,
  };
};
