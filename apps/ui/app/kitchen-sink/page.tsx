import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@tinji/ui/shared/page-header";
import type { Metadata } from "next";
import Link from "next/link";
import { categorySlug, groupByCategory, particleCount } from "./lib";

const description = `All ${particleCount} particles, grouped by category. Pick a category to see every demo with its live preview and full source code.`;

export const metadata: Metadata = {
  description,
  title: "Kitchen Sink - tinji ui",
  robots: { follow: true, index: false },
};

export default function Page() {
  const grouped = groupByCategory();

  return (
    <div className="container w-full">
      <PageHeader className="*:pb-8!">
        <PageHeaderHeading>Kitchen Sink</PageHeaderHeading>
        <PageHeaderDescription className="max-w-2xl">
          {description}
        </PageHeaderDescription>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {grouped.map(([category, items]) => (
          <Link
            className="flex items-center justify-between gap-2 rounded-xl border not-dark:bg-card p-4 transition-colors hover:bg-accent hover:text-foreground"
            href={`/kitchen-sink/${categorySlug(category)}`}
            key={category}
          >
            <span className="font-medium capitalize">{category}</span>
            <span className="text-muted-foreground text-sm tabular-nums">
              {items.length}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
