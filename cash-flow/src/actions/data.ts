"use server";

// import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

const dataSchema = z.object({
  id: z.string(),
  date: z.string().date(),
  source: z.string(),
  category: z.string(),
  amount: z.number(),
  note: z.string().nullish(),
});

export type Data = z.infer<typeof dataSchema>;
