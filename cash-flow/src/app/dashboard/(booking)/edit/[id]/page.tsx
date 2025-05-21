import { getBookingById } from "@/actions/data";
import { notFound } from "next/navigation";
import EditBooking from "@/components/Booking/Edit/edit-booking";

export default async function EditItemPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const booking = await getBookingById(id);

  if (!booking) {
    notFound();
  }

  return (
    <main>
      <EditBooking booking={booking[0]} />
    </main>
  );
}
