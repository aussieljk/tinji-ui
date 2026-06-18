"use client";

import { GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@tinji/ui/components/button";
import { siteConfig } from "@tinji/ui/lib/config";
import Link from "next/link";
import type * as React from "react";

export function GitHubLinkClient({ stars }: { stars: React.ReactNode }) {
  return (
    <Button
      className="relative h-8 shadow-none max-sm:w-8"
      render={
        <Link href={siteConfig.links.github} rel="noreferrer" target="_blank">
          <HugeiconsIcon className="size-4" icon={GithubIcon} strokeWidth={2} />
          <span className="max-sm:sr-only">{stars}</span>
        </Link>
      }
      size="sm"
      variant="ghost"
    />
  );
}
