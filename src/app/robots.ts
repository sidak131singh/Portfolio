import type { MetadataRoute } from "next";

// TODO: Replace with the real production URL after deploying to Vercel.
const siteUrl = "https://sidak-chahal-portfolio.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
