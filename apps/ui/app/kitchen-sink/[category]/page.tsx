import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@tinji/ui/shared/page-header";
import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Skeleton } from "@/registry/default/ui/skeleton";
import { categorySlug, getCategoryBySlug, groupByCategory } from "../lib";
import { ComponentPreview } from "@/components/component-preview";

// Prerender one static page per category — each is small enough to stay well
// under Vercel's 19MB page limit (unlike a single all-in-one page).
export function generateStaticParams() {
  return groupByCategory().map(([category]) => ({
    category: categorySlug(category),
  }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { category } = await props.params;
  const found = getCategoryBySlug(category);
  return {
    robots: { follow: true, index: false },
    title: found
      ? `${found[0]} — Kitchen Sink - tinji ui`
      : "Kitchen Sink - tinji ui",
  };
}

function ParticlePreviewSkeleton() {
  return <Skeleton className="mt-4 mb-12 h-[490px] w-full rounded-xl" />;
}

export default async function Page(props: Props) {
  const { category: slug } = await props.params;
  const found = getCategoryBySlug(slug);

  if (!found) {
    notFound();
  }

  const [category, items] = found;

  return (
    <div className="container w-full">
      <PageHeader className="*:pb-4!">
        <Link
          className="inline-flex w-fit items-center gap-1.5 text-muted-foreground text-sm transition-colors hover:text-foreground"
          href="/kitchen-sink"
        >
          <ArrowLeftIcon aria-hidden="true" className="size-4" />
          All categories
        </Link>
        <PageHeaderHeading className="capitalize">{category}</PageHeaderHeading>
        <PageHeaderDescription>
          {items.length} {items.length === 1 ? "particle" : "particles"}, each
          with its live preview and full source code.
        </PageHeaderDescription>
      </PageHeader>

      <div className="flex flex-col">
        {items.map((particle) => (
          <div
            className="scroll-mt-[calc(var(--header-height)+1rem)]"
            id={particle.name}
            key={particle.name}
          >
            <div className="flex flex-col gap-0.5">
              <h3 className="font-medium font-mono text-sm">{particle.name}</h3>
              {particle.description ? (
                <p className="text-muted-foreground text-sm">
                  {particle.description}
                </p>
              ) : null}
            </div>
            <Suspense fallback={<ParticlePreviewSkeleton />}>
              <ComponentPreview name={particle.name} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}
