"use client";

export default function Error() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">500 - Internal Server Error</h1>
      <p className="text-sm text-muted-foreground">
        An error occurred while loading the page.
      </p>
    </div>
  );
}
