"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export async function verifyOTP(otp: string) {
  const adminSecret = process.env.ADMIN_SECRET;
  const employeeSecret = process.env.EMPLOYEE_SECRET;

  if (otp === adminSecret) {
    return {
      success: true,
      role: "admin",
    };
  }
  if (otp === employeeSecret) {
    return {
      success: true,
      role: "employee",
    };
  }
  return {
    success: false,
  };
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validatedFields.success) {
    return "Missing fields. Failed to Login.";
  }

  const { email, password } = validatedFields.data;
  const data = {
    email: email as string,
    password: password as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    return error.message;
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const validatedFields = signupSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!validatedFields.success) {
    return "Missing fields. Failed to Signup.";
  }

  const { email, password, confirmPassword } = validatedFields.data;
  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        display_name: email?.split("@")[0] as string,
        avatar_url: "",
      },
    },
  });
  if (error) {
    return error.message;
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}
