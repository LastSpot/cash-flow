"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import Form from "next/form";
import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "../mode-toggle";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      const result = await signup(data);
      if (typeof result === "string") {
        toast.error("Signup failed", {
          description: result,
        });
        return;
      }
      toast.success("Signup successful", {
        description: "Welcome to the app!",
      });
      router.push("/dashboard");
    } catch (error) {
      toast.error("An unexpected error occurred", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form action={onSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                  </div>
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  "Signup"
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-center text-sm">
                <ModeToggle />
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <Link href="#">Terms of Service</Link> and{" "}
        <Link href="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
