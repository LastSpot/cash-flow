import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

export default function Lock() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Check out BlackBook</Button>
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center justify-center text-center gap-4 space-x-2">
        <DrawerHeader>
          <DrawerTitle>BlackBook</DrawerTitle>
          <DrawerDescription>
            Please login to continue using BlackBook.
          </DrawerDescription>
        </DrawerHeader>
        <Button>
          <Link href="/auth/signin">Sign In</Link>
        </Button>
        <Button>
          <Link href="/auth/signup">Sign Up</Link>
        </Button>
        <DrawerFooter>
          <div className="text-sm text-muted-foreground">
            We are not responsible for anything forward on this platform.
          </div>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
