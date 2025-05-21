"use client";

import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteBooking } from "@/actions/data";

export default function DeleteBooking({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteBooking(id);
    if (result.success) {
      toast.success("Booking deleted successfully");
      router.back();
    }
  };
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Delete Booking</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>Are you sure you want to delete this booking?</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
