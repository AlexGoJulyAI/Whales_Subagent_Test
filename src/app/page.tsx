import Link from "next/link";
import { getTestScenarios } from "@/lib/test-registry";

export default function Home() {
  const scenarios = getTestScenarios();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            Frontend Test Lab
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Independent front-end test scenarios. Each test is isolated with its
            own route and code.
          </p>
        </header>

        {scenarios.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              No test scenarios yet. Create a new folder in{" "}
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">
                src/app/tests/
              </code>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {scenarios.map((scenario) => (
              <Link
                key={scenario.slug}
                href={`/tests/${scenario.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-foreground/20 hover:shadow-md"
              >
                <h2 className="font-semibold group-hover:text-primary">
                  {scenario.title}
                </h2>
                {scenario.description && (
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {scenario.description}
                  </p>
                )}
                {scenario.tags && scenario.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {scenario.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
