import type { MetadataRoute } from "next";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();

  return [
    { url: "https://ui.tinji.dev/ui" },
    { url: "https://ui.tinji.dev/ui/particles" },
    ...pages.map((page) => ({
      url: `https://ui.tinji.dev/ui${page.url}`,
    })),
  ];
}
