import { Button } from "@/components/ui/button";
import { signout } from "@/actions/auth";

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Button onClick={signout}>Signout</Button>
    </div>
  );
}
