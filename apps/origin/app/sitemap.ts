import type { MetadataRoute } from "next";
import { categories } from "@/config/components";

export default function sitemap(): MetadataRoute.Sitemap {
  const home = {
    url: "https://ui.tinji.dev/origin",
  };
  const search = {
    url: "https://ui.tinji.dev/origin/search",
  };
  const easings = {
    url: "https://ui.tinji.dev/origin/easings",
  };
  const categoryPages = categories.map((category) => ({
    url: `https://ui.tinji.dev/origin/${category.slug}`,
  }));

  return [home, ...categoryPages, search, easings];
}
