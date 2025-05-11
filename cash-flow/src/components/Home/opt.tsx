"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { verifyOTP } from "@/actions/auth";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

export default function OPT() {
  const [value, setValue] = useState("");
  const form = useForm();
  const router = useRouter();

  useEffect(() => {
    if (value.length === 6) {
      const checkOTP = async () => {
        const verify = await verifyOTP(value);
        if (verify.success) {
          if (verify.role === "admin") {
            toast("Welcome Admin", {
              description: "You have successfully logged in",
            });
          } else if (verify.role === "employee") {
            toast("Welcome Employee", {
              description: "You have successfully logged in",
            });
          }
          router.push("/auth/signin");
        } else {
          toast("Invalid Secret Code", {
            description: "Please enter the correct secret code",
          });
        }
        setValue("");
      };

      checkOTP();
    }
  }, [value]);

  return (
    <Form {...form}>
      <form>
        <InputOTP
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </form>
    </Form>
  );
}
