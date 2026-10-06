import type { MetadataRoute } from "next";
import { langs } from "@/lib/i18n";
import { pageAlternates, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

const paths = ["", "/products", "/about", "/order"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    langs.map((lang) => ({
      url: `${siteUrl}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(pageAlternates(lang, path).languages).map(
            ([hreflang, href]) => [hreflang, siteUrl + href],
          ),
        ),
      },
    })),
  );
}
