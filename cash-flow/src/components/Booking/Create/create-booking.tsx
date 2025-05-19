"use client";

import { useRouter } from "next/navigation";
import Form from "next/form";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createBooking } from "@/actions/data";
import { CreateButton } from "./create-button";

export function CreateBooking() {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (formData: FormData) => {
    try {
      formData.set("type", type);
      formData.set("category", category);
      const result = await createBooking(formData);

      if (result.success) {
        toast.success("Booking created successfully");
        router.back();
      } else {
        toast.error("Failed to create booking");
        formRef.current?.reset();
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Create Item</CardTitle>
      </CardHeader>
      <CardContent>
        <Form ref={formRef} action={onSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="type">Type of transaction</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type of transaction</SelectLabel>
                  <SelectItem value="revenue">Revenue</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="source">Source</Label>
            <Input
              id="source"
              name="source"
              placeholder="Enter source"
              required
            />
          </div>

          {type === "revenue" && (
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type of transaction</SelectLabel>
                    <SelectItem value="Interest">Interest</SelectItem>
                    <SelectItem value="Licensing">Licensing</SelectItem>
                    <SelectItem value="Rent">Rent</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Services">Services</SelectItem>
                    <SelectItem value="Subscriptions">Subscriptions</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          {type === "expense" && (
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Type of transaction</SelectLabel>
                    <SelectItem value="Bank Fees">Bank Fees</SelectItem>
                    <SelectItem value="Dues and Subscriptions">
                      Dues and Subscriptions
                    </SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Interest Expense">
                      Interest Expense
                    </SelectItem>
                    <SelectItem value="Loss on Sale of Assets">
                      Loss on Sale of Assets
                    </SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Marketing and Advertising">
                      Marketing and Advertising
                    </SelectItem>
                    <SelectItem value="Professional Fees">
                      Professional Fees
                    </SelectItem>
                    <SelectItem value="Rent or Lease Payment">
                      Rent or Lease Payment
                    </SelectItem>
                    <SelectItem value="Salary">Salary</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="amount">Amount (USD)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="10"
              placeholder="0.00"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Textarea
              id="note"
              name="note"
              placeholder="Add additional details"
              className="resize-none"
            />
          </div>

          <CreateButton>Create</CreateButton>
        </Form>
      </CardContent>
    </Card>
  );
}
