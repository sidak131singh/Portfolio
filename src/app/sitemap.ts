import type { MetadataRoute } from "next";

// TODO: Replace with the real production URL after deploying to Vercel.
const siteUrl = "https://sidak-chahal-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
