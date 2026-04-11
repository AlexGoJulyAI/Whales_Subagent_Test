import { Button } from "@/components/ui/button";

export default function ExampleTest() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold">Example Test</h1>
      <p className="mt-2 text-muted-foreground">
        This is a minimal test scenario to verify the setup works. Replace this
        with your actual test content.
      </p>
      <div className="mt-8 flex gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
    </div>
  );
}
