import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: "/private/",
      userAgent: "*",
    },
    sitemap: [
      "https://ui.tinji.dev/sitemap.xml",
      "https://ui.tinji.dev/origin/sitemap.xml",
      "https://ui.tinji.dev/sitemap.xml",
    ],
  };
}
