import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://ui.tinji.dev" },
    { url: "https://ui.tinji.dev/scheduling" },
    { url: "https://ui.tinji.dev/calendar" },
    { url: "https://ui.tinji.dev/email" },
    { url: "https://ui.tinji.dev/sms" },
    { url: "https://ui.tinji.dev/video" },
    { url: "https://ui.tinji.dev/payments" },
    { url: "https://ui.tinji.dev/notifications" },
    { url: "https://ui.tinji.dev/auth" },
  ];
}
