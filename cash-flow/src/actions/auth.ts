"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type signinState = {
  error?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export type signupState = {
  error?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export type User = {
  id: string;
  email: string;
  display_name: string;
  role: string;
};

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

export async function signin(formData: FormData) {
  const supabase = await createClient();
  const validatedFields = signinSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  console.log(validatedFields);
  console.log(formData);
  if (!validatedFields.success) {
    throw new Error("Missing fields. Failed to Login.");
  }

  const { email, password } = validatedFields.data;
  const data = {
    email: email as string,
    password: password as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/dashboard");
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
      },
    },
  });
  if (error) {
    return error.message;
  }

  revalidatePath("/dashboard");
}

export async function signout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  return {
    id: user.user?.id,
    email: user.user?.email,
    display_name: user.user?.user_metadata.display_name,
    role: user.user?.user_metadata.role,
  };
}
