"use server";

import { createClient } from "@/lib/supabase/server";
import { getCurrentUser, User } from "./auth";
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

const overviewSchema = z.object({
  month: z.string(),
  revenue: z.number(),
  expenses: z.number(),
});

const profitSchema = z.object({
  month: z.string(),
  profit: z.number(),
});

const ytdRevenueSchema = z.object({
  revenue: z.number(),
  growthRate: z.number(),
});

const ytdExpenseSchema = z.object({
  expense: z.number(),
  growthRate: z.number(),
});

const yrdProfitSchema = z.object({
  profit: z.number(),
  growthRate: z.number(),
});

const debtSchema = z.object({
  debt: z.number(),
  growthRate: z.number(),
});

export type Data = z.infer<typeof dataSchema>;
export type OverviewData = z.infer<typeof overviewSchema>;
export type ProfitData = z.infer<typeof profitSchema>;
export type YtdRevenueData = z.infer<typeof ytdRevenueSchema>;
export type YtdExpenseData = z.infer<typeof ytdExpenseSchema>;
export type YrdProfitData = z.infer<typeof yrdProfitSchema>;
export type DebtData = z.infer<typeof debtSchema>;

const mockRevenueData: Data[] = [
  {
    id: "rev-001",
    date: "2024-07-18",
    category: "Sales",
    source: "Website Sale",
    amount: 125.5,
    note: "Order #1050",
  },
  {
    id: "rev-002",
    date: "2025-01-20",
    category: "Subscription",
    source: "Monthly Software Fee",
    amount: 49.0,
    note: "User account renewal",
  },
  {
    id: "rev-003",
    date: "2023-11-05",
    category: "Service",
    source: "Consulting Fee",
    amount: 850.0,
    note: "Project alpha phase 1",
  },
  {
    id: "rev-004",
    date: "2024-04-11",
    category: "Usage-Based",
    source: "Cloud Hosting Bill",
    amount: 78.2,
    note: "", // Note is an empty string
  },
  {
    id: "rev-005",
    date: "2025-05-01",
    category: "Interest",
    source: "Savings Account Interest",
    amount: 5.3,
    note: "April 2025 interest payout",
  },
  {
    id: "rev-006",
    date: "2024-09-03",
    category: "Sales",
    source: "In-Store Purchase",
    amount: 310.75,
    note: "Receipt #4501",
  },
  {
    id: "rev-007",
    date: "2025-02-14",
    category: "Licensing",
    source: "Software License Renewal",
    amount: 1200.0,
    note: "Annual license for client X",
  },
  {
    id: "rev-008",
    date: "2023-10-29",
    category: "Service",
    source: "Maintenance Contract",
    amount: 350.0,
    note: "", // Note is an empty string
  },
  {
    id: "rev-009",
    date: "2024-12-19",
    category: "Subscription",
    source: "Annual Membership Fee",
    amount: 299.0,
    note: "Membership renewal",
  },
  {
    id: "rev-010",
    date: "2025-03-08",
    category: "Rent",
    source: "Office Space Rental",
    amount: 1500.0,
    note: "March rent payment",
  },
  {
    id: "rev-011",
    date: "2024-01-25",
    category: "Sales",
    source: "E-commerce Sale",
    amount: 88.99,
    note: null, // Still showing some null just in case, but schema implies string
  },
  {
    id: "rev-012",
    date: "2025-04-02",
    category: "Service",
    source: "Installation Fee",
    amount: 400.0,
    note: "New client setup",
  },
  {
    id: "rev-013",
    date: "2023-07-10",
    category: "Sales",
    source: "Website Sale",
    amount: 55.0,
    note: "Small item purchase",
  },
  {
    id: "rev-014",
    date: "2024-08-30",
    category: "Usage-Based",
    source: "API Usage Fees",
    amount: 115.6,
    note: "",
  },
  {
    id: "rev-015",
    date: "2025-06-16",
    category: "Subscription",
    source: "Quarterly Service Fee",
    amount: 150.0,
    note: "Q2 service subscription",
  },
  {
    id: "rev-016",
    date: "2024-02-01",
    category: "Interest",
    source: "Investment Dividend",
    amount: 25.75,
    note: "Quarterly dividend",
  },
  {
    id: "rev-017",
    date: "2023-09-12",
    category: "Service",
    source: "Repair Service",
    amount: 220.0,
    note: "Equipment repair",
  },
  {
    id: "rev-018",
    date: "2024-10-22",
    category: "Sales",
    source: "In-Store Purchase",
    amount: 45.9,
    note: "",
  },
  {
    id: "rev-019",
    date: "2025-07-07",
    category: "Licensing",
    source: "Content License",
    amount: 750.0,
    note: "Use of stock footage",
  },
  {
    id: "rev-020",
    date: "2024-03-15",
    category: "Subscription",
    source: "Monthly Membership",
    amount: 19.99,
    note: "",
  },
  {
    id: "rev-021",
    date: "2023-08-01",
    category: "Rent",
    source: "Equipment Rental",
    amount: 300.0,
    note: "Monthly equipment lease",
  },
  {
    id: "rev-022",
    date: "2024-11-28",
    category: "Sales",
    source: "Website Sale",
    amount: 65.4,
    note: "Black Friday deal",
  },
  {
    id: "rev-023",
    date: "2025-08-10",
    category: "Service",
    source: "Consulting Fee",
    amount: 1100.0,
    note: "Follow-up consultation",
  },
  {
    id: "rev-024",
    date: "2024-05-09",
    category: "Usage-Based",
    source: "Utility Charges",
    amount: 185.5,
    note: "Electricity usage",
  },
  {
    id: "rev-025",
    date: "2023-12-06",
    category: "Sales",
    source: "E-commerce Sale",
    amount: 250.0,
    note: "Holiday gift purchase",
  },
  {
    id: "rev-026",
    date: "2025-09-21",
    category: "Subscription",
    source: "Annual Service Plan",
    amount: 500.0,
    note: "Premier plan renewal",
  },
  {
    id: "rev-027",
    date: "2024-06-07",
    category: "Interest",
    source: "Business Account Interest",
    amount: 8.15,
    note: "",
  },
  {
    id: "rev-028",
    date: "2023-06-18",
    category: "Service",
    source: "Project Management",
    amount: 900.0,
    note: "Phase 2 completion payment",
  },
  {
    id: "rev-029",
    date: "2024-01-04",
    category: "Sales",
    source: "In-Store Purchase",
    amount: 35.0,
    note: "",
  },
  {
    id: "rev-030",
    date: "2025-10-05",
    category: "Licensing",
    source: "Patent License",
    amount: 3000.0,
    note: "Quarterly patent usage fee",
  },
  {
    id: "rev-031",
    date: "2024-02-29", // Leap year date
    category: "Subscription",
    source: "Monthly Access Fee",
    amount: 25.0,
    note: "",
  },
  {
    id: "rev-032",
    date: "2023-05-22",
    category: "Sales",
    source: "Website Sale",
    amount: 175.8,
    note: "Repeat customer order",
  },
  {
    id: "rev-033",
    date: "2025-11-11",
    category: "Service",
    source: "Training Workshop",
    amount: 600.0,
    note: "Corporate training session",
  },
  {
    id: "rev-034",
    date: "2024-07-01",
    category: "Rent",
    source: "Vehicle Lease",
    amount: 450.0,
    note: "Monthly lease payment",
  },
  {
    id: "rev-035",
    date: "2023-04-15",
    category: "Usage-Based",
    source: "Data Transfer Fees",
    amount: 95.1,
    note: "",
  },
  {
    id: "rev-036",
    date: "2025-12-03",
    category: "Sales",
    source: "E-commerce Sale",
    amount: 550.0,
    note: "High-value item",
  },
  {
    id: "rev-037",
    date: "2024-08-19",
    category: "Subscription",
    source: "Magazine Subscription",
    amount: 30.0,
    note: "Annual print subscription",
  },
  {
    id: "rev-038",
    date: "2023-03-10",
    category: "Service",
    source: "Consulting Fee",
    amount: 700.0,
    note: "",
  },
  {
    id: "rev-039",
    date: "2025-01-01",
    category: "Interest",
    source: "Annual Bond Interest",
    amount: 150.0,
    note: "Yearly interest payout",
  },
  {
    id: "rev-040",
    date: "2024-09-17",
    category: "Sales",
    source: "In-Store Purchase",
    amount: 110.25,
    note: null,
  },
  {
    id: "rev-041",
    date: "2023-02-08",
    category: "Licensing",
    source: "Music License",
    amount: 400.0,
    note: "Background music usage",
  },
  {
    id: "rev-042",
    date: "2025-02-07",
    category: "Service",
    source: "Website Development",
    amount: 2500.0,
    note: "Website project payment",
  },
  {
    id: "rev-043",
    date: "2024-03-29",
    category: "Usage-Based",
    source: "Storage Fees",
    amount: 40.0,
    note: "",
  },
  {
    id: "rev-044",
    date: "2023-01-16",
    category: "Sales",
    source: "E-commerce Sale",
    amount: 99.5,
    note: "First order of the year",
  },
  {
    id: "rev-045",
    date: "2025-03-31",
    category: "Subscription",
    source: "Premium Service Tier",
    amount: 75.0,
    note: "Tier upgrade",
  },
  {
    id: "rev-046",
    date: "2024-10-10",
    category: "Rent",
    source: "Equipment Rental",
    amount: 320.0,
    note: "Additional equipment rental",
  },
  {
    id: "rev-047",
    date: "2023-04-04",
    category: "Service",
    source: "Legal Consultation",
    amount: 300.0,
    note: "",
  },
  {
    id: "rev-048",
    date: "2025-04-25",
    category: "Sales",
    source: "Website Sale",
    amount: 140.0,
    note: null,
  },
  {
    id: "rev-049",
    date: "2024-11-15",
    category: "Interest",
    source: "Fixed Deposit Interest",
    amount: 80.0,
    note: "Semi-annual interest",
  },
  {
    id: "rev-050",
    date: "2023-01-31",
    category: "Subscription",
    source: "Monthly Software Fee",
    amount: 49.0,
    note: "New subscriber",
  },
];

const mockExpenseData: Data[] = [
  {
    id: "data-101",
    date: "2024-08-01",
    source: "Payroll Services Inc.",
    category: "Salary",
    amount: 4900.0,
    note: "Bi-weekly payroll",
  },
  {
    id: "data-102",
    date: "2025-01-25",
    source: "Downtown Properties",
    category: "Rent or Lease Payment",
    amount: 2100.0,
    note: "Office rent",
  },
  {
    id: "data-103",
    date: "2023-11-10",
    source: "Digital Ads Co.",
    category: "Marketing and Advertising",
    amount: 800.0,
    note: "November ad campaign",
  },
  {
    id: "data-104",
    date: "2024-04-16",
    source: "Office Supply Store",
    category: "Office Supplies",
    amount: 125.0,
    note: null,
  },
  {
    id: "data-105",
    date: "2025-05-06",
    source: "City National Bank",
    category: "Bank Fees",
    amount: 45.0,
    note: "Monthly service fee",
  },
  {
    id: "data-106",
    date: "2024-09-08",
    source: "Supplier A Inc.",
    category: "Cost of Goods Sold",
    amount: 2600.0,
    note: "Raw materials delivery",
  },
  {
    id: "data-107",
    date: "2025-02-19",
    source: "Business Insurance Co.",
    category: "Insurance",
    amount: 480.0,
    note: "Quarterly premium",
  },
  {
    id: "data-108",
    date: "2023-11-03",
    source: "Legal Advisory LLC",
    category: "Professional Fees",
    amount: 1300.0,
    note: "Contract review",
  },
  {
    id: "data-109",
    date: "2024-12-24",
    source: "Local Power Company",
    category: "Utilities",
    amount: 310.0,
    note: "Electricity bill",
  },
  {
    id: "data-110",
    date: "2025-03-13",
    source: "Travel Agency",
    category: "Travel",
    amount: 700.0,
    note: "Flight booking",
  },
  {
    id: "data-111",
    date: "2024-01-30",
    source: "Maintenance Services",
    category: "Maintenance",
    amount: 220.0,
    note: "HVAC repair",
  },
  {
    id: "data-112",
    date: "2025-04-07",
    source: "Lender Corp",
    category: "Interest Expense",
    amount: 150.0,
    note: "Monthly loan interest",
  },
  {
    id: "data-113",
    date: "2023-07-15",
    source: "Payroll Services Inc.",
    category: "Salary",
    amount: 4900.0,
    note: "Monthly payroll",
  },
  {
    id: "data-114",
    date: "2024-08-04",
    source: "Warehouse Leasing Co.",
    category: "Rent or Lease Payment",
    amount: 1500.0,
    note: "August warehouse lease",
  },
  {
    id: "data-115",
    date: "2025-06-21",
    source: "SEO Consultants",
    category: "Marketing and Advertising",
    amount: 1000.0,
    note: "Monthly SEO retainer",
  },
  {
    id: "data-116",
    date: "2024-02-06",
    source: "Amazon",
    category: "Office Supplies",
    amount: 75.0,
    note: "",
  },
  {
    id: "data-117",
    date: "2023-09-18",
    source: "Global Bank",
    category: "Bank Fees",
    amount: 60.0,
    note: "Wire transfer fees",
  },
  {
    id: "data-118",
    date: "2024-10-27",
    source: "Freelance Developer John Doe",
    category: "Cost of Goods Sold",
    amount: 1800.0,
    note: "Payment for project module",
  },
  {
    id: "data-119",
    date: "2025-07-12",
    source: "Employee Health Plans",
    category: "Insurance",
    amount: 600.0,
    note: "Monthly health premiums",
  },
  {
    id: "data-120",
    date: "2024-03-20",
    source: "Telecom Provider",
    category: "Utilities",
    amount: 170.0,
    note: "Internet and phone service",
  },
  {
    id: "data-121",
    date: "2023-08-06",
    source: "Hotel Chain Name",
    category: "Travel",
    amount: 450.0,
    note: "Hotel stay for client meeting",
  },
  {
    id: "data-122",
    date: "2024-12-03",
    source: "Vehicle Service Center",
    category: "Maintenance",
    amount: 350.0,
    note: "Fleet vehicle service",
  },
  {
    id: "data-123",
    date: "2025-08-15",
    source: "Consulting Group",
    category: "Professional Fees",
    amount: 1700.0,
    note: "Strategic consulting",
  },
  {
    id: "data-124",
    date: "2024-05-14",
    source: "Local Bank",
    category: "Interest Expense",
    amount: 115.0,
    note: "",
  },
  {
    id: "data-125",
    date: "2023-12-11",
    source: "Print Shop",
    category: "Marketing and Advertising",
    amount: 450.0,
    note: "Holiday flyers",
  },
  {
    id: "data-126",
    date: "2025-09-26",
    source: "Payroll Services Inc.",
    category: "Salary",
    amount: 2450.0,
    note: "Bi-weekly payroll",
  },
  {
    id: "data-127",
    date: "2024-06-12",
    source: "Downtown Properties",
    category: "Rent or Lease Payment",
    amount: 2100.0,
    note: "June office rent",
  },
  {
    id: "data-128",
    date: "2023-06-23",
    source: "Manufacturer B",
    category: "Cost of Goods Sold",
    amount: 3800.0,
    note: "Bulk inventory order",
  },
  {
    id: "data-129",
    date: "2024-01-09",
    source: "City Water Department",
    category: "Utilities",
    amount: 100.0,
    note: "Water and sewage",
  },
  {
    id: "data-130",
    date: "2025-10-10",
    source: "Car Rental Company",
    category: "Travel",
    amount: 180.0,
    note: "Car rental for trip",
  },
  {
    id: "data-131",
    date: "2024-02-12",
    source: "Office Supply Store",
    category: "Office Supplies",
    amount: 90.0,
    note: "General supplies",
  },
  {
    id: "data-132",
    date: "2023-05-27",
    source: "City National Bank",
    category: "Bank Fees",
    amount: 30.0,
    note: null,
  },
  {
    id: "data-133",
    date: "2025-11-16",
    source: "External IT Support",
    category: "Professional Fees",
    amount: 850.0,
    note: "Network maintenance",
  },
  {
    id: "data-134",
    date: "2024-07-06",
    source: "Insurance Brokerage",
    category: "Insurance",
    amount: 520.0,
    note: "Monthly liability premium",
  },
  {
    id: "data-135",
    date: "2023-04-20",
    source: "Local Ad Company",
    category: "Marketing and Advertising",
    amount: 380.0,
    note: "Local radio ad",
  },
  {
    id: "data-136",
    date: "2025-12-08",
    source: "Payroll Services Inc.",
    category: "Salary",
    amount: 4900.0,
    note: "Monthly payroll",
  },
  {
    id: "data-137",
    date: "2024-08-24",
    source: "Downtown Properties",
    category: "Rent or Lease Payment",
    amount: 2100.0,
    note: "August office rent",
  },
  {
    id: "data-138",
    date: "2023-03-15",
    source: "Supplier C",
    category: "Cost of Goods Sold",
    amount: 2000.0,
    note: "Component order",
  },
  {
    id: "data-139",
    date: "2025-01-06",
    source: "Gas Utility",
    category: "Utilities",
    amount: 180.0,
    note: "Gas bill",
  },
  {
    id: "data-140",
    date: "2024-09-22",
    source: "Business Coach Jane Doe",
    category: "Professional Fees",
    amount: 850.0,
    note: "Coaching session",
  },
  {
    id: "data-141",
    date: "2023-02-13",
    source: "Trainline",
    category: "Travel",
    amount: 160.0,
    note: "Train tickets for meeting",
  },
  {
    id: "data-142",
    date: "2025-02-12",
    source: "Software Provider",
    category: "Maintenance",
    amount: 280.0,
    note: "Software license maintenance",
  },
  {
    id: "data-143",
    date: "2024-04-03",
    source: "Bank Loan Department",
    category: "Interest Expense",
    amount: 120.0,
    note: "",
  },
  {
    id: "data-144",
    date: "2023-01-21",
    source: "Online Directory Service",
    category: "Marketing and Advertising",
    amount: 110.0,
    note: "Annual listing fee",
  },
  {
    id: "data-145",
    date: "2025-04-04",
    source: "Business Association",
    category: "Dues and Subscriptions",
    amount: 40.0,
    note: "Monthly membership",
  },
  {
    id: "data-146",
    date: "2024-10-15",
    source: "Restaurant Name",
    category: "Business Meals",
    amount: 85.0,
    note: "Client lunch",
  },
  {
    id: "data-147",
    date: "2023-04-09",
    source: "USPS",
    category: "Shipping and Postage",
    amount: 50.0,
    note: "Postage for mailers",
  },
  {
    id: "data-148",
    date: "2025-05-07",
    source: "Asset Sale",
    category: "Loss on Sale of Assets",
    amount: 600.0,
    note: "Loss from sale of old server",
  },
  {
    id: "data-149",
    date: "2024-11-20",
    source: "Payment Processor",
    category: "Foreign Exchange Losses",
    amount: 250.0,
    note: "Loss on foreign currency transaction",
  },
  {
    id: "data-150",
    date: "2023-01-15",
    source: "Internal Adjustment",
    category: "Inventory Write-offs",
    amount: 400.0,
    note: "Write-off due to spoilage",
  },
];

const mockOverviewData = [
  { month: "January", revenue: 186, expenses: 80 },
  { month: "February", revenue: 305, expenses: 200 },
  { month: "March", revenue: 237, expenses: 120 },
  { month: "April", revenue: 73, expenses: 190 },
  { month: "May", revenue: 209, expenses: 130 },
  { month: "June", revenue: 214, expenses: 140 },
  { month: "July", revenue: 913, expenses: 213 },
  { month: "August", revenue: 765, expenses: 546 },
  { month: "September", revenue: 345, expenses: 546 },
  { month: "October", revenue: 453, expenses: 213 },
  { month: "November", revenue: 879, expenses: 657 },
  { month: "December", revenue: 677, expenses: 342 },
];

const mockProfitData = [
  { month: "January", profit: 123123 },
  { month: "February", profit: 205 },
  { month: "March", profit: -207 },
  { month: "April", profit: 173 },
  { month: "May", profit: -209 },
  { month: "June", profit: 214 },
  { month: "July", profit: 231 },
  { month: "August", profit: -342 },
  { month: "September", profit: 564 },
  { month: "October", profit: -675 },
  { month: "November", profit: -123 },
  { month: "December", profit: -100 },
];

const mockYtdRevenueData = [
  { year: 2025, revenue: 123456 },
  { year: 2024, revenue: 2831 },
];
const mockYtdExpenseData = [
  { year: 2025, expenses: 2314 },
  { year: 2024, expenses: 1232 },
];
const mockYtdProfitData = [
  { year: 2025, profit: 5433 },
  { year: 2024, profit: 4532 },
];
const mockDebtData = [
  { year: 2025, debt: 5433 },
  { year: 2024, debt: 4532 },
];

export const getRevenueData = async (): Promise<Data[]> => {
  console.time("getRevenueDataDuration");

  const supabase = await createClient();
  const user = await getCurrentUser();

  let { data, error } = await supabase
    .from("finance")
    .select("id, date, source, category, amount, note")
    .eq("user_id", user.id)
    .eq("type", "revenue")
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
  }

  console.timeEnd("getRevenueDataDuration");
  return data || [];
};

export const getExpenseData = async () => {
  console.time("getExpenseDataDuration");

  const supabase = await createClient();
  const user = await getCurrentUser();

  let { data, error } = await supabase
    .from("finance")
    .select("id, date, source, category, amount, note")
    .eq("user_id", user.id)
    .eq("type", "expense")
    .order("date", { ascending: false });

  if (error) {
    console.error(error);
  }

  console.timeEnd("getExpenseDataDuration");
  return data || [];
};

export const getOverviewData = async () => {
  return mockOverviewData;
};

export const getProfitData = async () => {
  return mockProfitData;
};

export const getYtdRevenueData = async () => {
  const currentYearRevenue = mockYtdRevenueData[0].revenue;
  const previousYearRevenue = mockYtdRevenueData[1].revenue;
  const growthRate =
    ((currentYearRevenue - previousYearRevenue) / previousYearRevenue) * 100;
  const growthRatePercentage = parseInt(growthRate.toFixed(2));

  return {
    revenue: formatNumber(currentYearRevenue),
    growthRate: growthRatePercentage,
  };
};

export const getYtdExpenseData = async () => {
  const currentYearExpenses = mockYtdExpenseData[0].expenses;
  const previousYearExpenses = mockYtdExpenseData[1].expenses;
  const growthRate =
    ((currentYearExpenses - previousYearExpenses) / previousYearExpenses) * 100;
  const growthRatePercentage = parseInt(growthRate.toFixed(2));

  return {
    expenses: formatNumber(currentYearExpenses),
    growthRate: growthRatePercentage,
  };
};

export const getYtdProfitData = async () => {
  const currentYearProfit = mockYtdProfitData[0].profit;
  const previousYearProfit = mockYtdProfitData[1].profit;
  const growthRate =
    ((currentYearProfit - previousYearProfit) / previousYearProfit) * 100;
  const growthRatePercentage = parseInt(growthRate.toFixed(2));

  return {
    profit: formatNumber(currentYearProfit),
    growthRate: growthRatePercentage,
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
