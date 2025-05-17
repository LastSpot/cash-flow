import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2, LogIn, LogOut } from "lucide-react";
import { signout } from "@/actions/auth";

export function AuthButton({
  data,
  children,
  ...props
}: {
  data: string;
  children: React.ReactNode;
} & React.ComponentProps<"button">) {
  const { pending } = useFormStatus();

  const handleSignout = async () => {
    await signout();
  };

  if (data === "signin") {
    return (
      <Button type="submit" disabled={pending} {...props}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing in...
          </>
        ) : (
          <>
            <LogIn className="size-4" />
            {children}
          </>
        )}
      </Button>
    );
  } else if (data === "signup") {
    return (
      <Button type="submit" disabled={pending} {...props}>
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Signing up...
          </>
        ) : (
          <>
            <LogIn className="size-4" />
            {children}
          </>
        )}
      </Button>
    );
  } else {
    return (
      <Button onClick={handleSignout} {...props}>
        <LogOut className="size-4" />
        Sign out
      </Button>
    );
  }
}
