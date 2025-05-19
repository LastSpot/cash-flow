"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createBooking } from "@/actions/data";
import { CreateButton } from "./create-button";
import {
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

// Add this type definition at the top of the file, after the imports
type BookingFormData = {
  date: Date;
  source: string;
  note: string;
};

export function CreateBooking() {
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");

  const form = useForm<BookingFormData>({
    defaultValues: {
      date: new Date(),
      source: "",
      note: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    try {
      const formData = new FormData();
      formData.set("type", type);
      formData.set("category", category);
      formData.set("date", data.date.toISOString());
      formData.set("source", data.source);
      formData.set("note", data.note || "");
      formData.set("amount", amount);

      const result = await createBooking(formData);

      if (result.success) {
        toast.success("Booking created successfully");
        router.back();
      } else {
        toast.error("Failed to create booking", {
          description:
            result.error instanceof Error
              ? result.error.message
              : "Please try again",
        });
        form.reset();
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() ||
                          date <=
                            new Date(
                              `${new Date().getFullYear()}-${new Date().getMonth()}-01`
                            )
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter source" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />

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
                      <SelectItem value="Subscriptions">
                        Subscriptions
                      </SelectItem>
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
                id="amount_display"
                value={displayAmount}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^\d.]/g, "");

                  if (value === "" || /^\d*\.?\d*$/.test(value)) {
                    setAmount(value);
                    setDisplayAmount(value);
                  }
                }}
                onBlur={() => {
                  if (amount) {
                    const numValue = parseFloat(amount);
                    if (!isNaN(numValue)) {
                      setDisplayAmount(numValue.toLocaleString("en-US"));
                    }
                  }
                }}
                onFocus={() => {
                  setDisplayAmount(amount);
                }}
                placeholder="0.00"
                required
              />
              <input type="hidden" name="amount" value={amount} />
            </div>

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add additional details"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <CreateButton>Create</CreateButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
