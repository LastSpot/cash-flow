import DeleteBooking from "@/components/Booking/Delete/delete-booking";

export default async function DeleteBookingPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  return (
    <main>
      <DeleteBooking id={id} />
    </main>
  );
}
