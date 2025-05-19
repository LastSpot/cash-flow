import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2, Plus } from "lucide-react";

export function CreateButton({
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
          Creating...
        </>
      ) : (
        <>
          <Plus className="size-4" />
          {children}
        </>
      )}
    </Button>
  );
}
