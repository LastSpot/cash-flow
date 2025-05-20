"use client";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
      <p className="text-sm text-muted-foreground">
        The page you are looking for does not exist.
      </p>
    </div>
  );
}
