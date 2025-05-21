import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2, Pencil } from "lucide-react";

export function EditButton({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ComponentProps<"button">) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Updating...
        </>
      ) : (
        <>
          <Pencil className="size-4" />
          {children}
        </>
      )}
    </Button>
  );
}
