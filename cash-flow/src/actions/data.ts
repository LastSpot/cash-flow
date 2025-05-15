"use server";

// import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const revenueSchema = z.object({
  id: z.string(),
  date: z.string().date(),
  source: z.string(),
  category: z.string(),
  amount: z.number(),
  note: z.string().nullish(),
});

export type Revenue = z.infer<typeof revenueSchema>;
