import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@tinji/ui/shared/page-header";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Skeleton } from "@/registry/default/ui/skeleton";
import type { RegistryCategory } from "@/registry/registry-categories";
import { particles } from "@/registry/registry-particles";
import { ComponentPreview } from "@/components/component-preview";

type Particle = (typeof particles)[number];

const particleCount = particles.length;

const description = `Every one of the ${particleCount} particles rendered on a single page, each with its live preview and full source code. The kitchen sink.`;

export const metadata: Metadata = {
  description,
  title: "Kitchen Sink - tinji ui",
  robots: { follow: true, index: false },
};

// Grouping is derived from the canonical particle list (registry-particles.ts),
// using each particle's first declared category as its group.
function groupByCategory(items: Particle[]) {
  const groups = new Map<string, Particle[]>();

  for (const item of items) {
    const category =
      (item.categories?.[0] as RegistryCategory | undefined) ?? "uncategorized";
    const bucket = groups.get(category) ?? [];
    bucket.push(item);
    groups.set(category, bucket);
  }

  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function anchorId(category: string) {
  return `category-${category.replace(/\s+/g, "-")}`;
}

function ParticlePreviewSkeleton() {
  return <Skeleton className="mt-4 mb-12 h-[490px] w-full rounded-xl" />;
}

export default function Page() {
  const grouped = groupByCategory(particles);

  return (
    <div className="container w-full">
      <PageHeader className="*:pb-8!">
        <PageHeaderHeading>Kitchen Sink</PageHeaderHeading>
        <PageHeaderDescription className="max-w-2xl">
          {description}
        </PageHeaderDescription>
      </PageHeader>

      {/* In-page index: jump to any category */}
      <nav
        aria-label="Categories"
        className="mb-12 flex flex-wrap gap-2 rounded-xl border not-dark:bg-card p-4"
      >
        {grouped.map(([category, items]) => (
          <a
            className="rounded-lg border px-2.5 py-1 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground"
            href={`#${anchorId(category)}`}
            key={category}
          >
            <span className="capitalize">{category}</span>{" "}
            <span className="text-muted-foreground/70">{items.length}</span>
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-16">
        {grouped.map(([category, items]) => (
          <section
            aria-labelledby={anchorId(category)}
            className="scroll-mt-[calc(var(--header-height)+1rem)]"
            id={anchorId(category)}
            key={category}
          >
            <h2 className="mb-2 font-heading font-semibold text-2xl capitalize">
              {category}
            </h2>
            <p className="mb-6 text-muted-foreground text-sm">
              {items.length} {items.length === 1 ? "particle" : "particles"}
            </p>

            <div className="flex flex-col">
              {items.map((particle) => (
                <div
                  className="scroll-mt-[calc(var(--header-height)+1rem)]"
                  id={particle.name}
                  key={particle.name}
                >
                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-medium font-mono text-sm">
                      {particle.name}
                    </h3>
                    {particle.description ? (
                      <p className="text-muted-foreground text-sm">
                        {particle.description}
                      </p>
                    ) : null}
                  </div>
                  <Suspense fallback={<ParticlePreviewSkeleton />}>
                    {/* Reuses the docs preview component: live preview + source
                        in the same tabbed chrome used throughout the docs. */}
                    <ComponentPreview name={particle.name} />
                  </Suspense>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
