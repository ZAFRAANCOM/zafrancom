import type { Metadata } from "next";
import { notoSansArabic } from "@/lib/fonts";
import { getLang, langs, type Lang, type LangParams } from "@/lib/i18n";
import { images } from "@/lib/images";
import { brandName, contact, pageAlternates, siteUrl } from "@/lib/site";

const logoUrl = images.logo.src;

const localizedMetadata: Record<
  Lang,
  {
    title: string;
    titleTemplate: string;
    description: string;
    ogLocale: string;
    logoAlt: string;
    keywords: string[];
  }
> = {
  ar: {
    title: "زعفرانكم | زعفران أردني أصيل",
    titleTemplate: "%s | زعفرانكم",
    description: "زعفران أردني أصيل ومنتجاته الطبيعية — جودة مختارة بلمسة محلية.",
    ogLocale: "ar_JO",
    logoAlt: "شعار زعفرانكم",
    keywords: ["زعفران أردني", "زعفران", "منتجات الزعفران", "زيت الزعفران", "سيروم الزعفران", "زعفرانكم"],
  },
  en: {
    title: "zafraancom | Authentic Jordanian Saffron",
    titleTemplate: "%s | zafraancom",
    description:
      "Authentic Jordanian saffron and its natural products — carefully selected, locally grown.",
    ogLocale: "en_US",
    logoAlt: "zafraancom logo",
    keywords: ["Jordanian saffron", "saffron", "saffron products", "saffron oil", "saffron serum", "zafraancom"],
  },
};

function structuredData(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName[lang],
    ...(lang === "ar" && { alternateName: brandName.en }),
    url: `${siteUrl}/${lang}`,
    logo: new URL(logoUrl, siteUrl).href,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phoneIntl,
      contactType: "sales",
      areaServed: "JO",
      availableLanguage: ["ar", "en"],
    },
    sameAs: [contact.instagramUrl],
  };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const m = localizedMetadata[lang];
  return {
    metadataBase: new URL(siteUrl),
    title: { default: m.title, template: m.titleTemplate },
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: brandName[lang] }],
    creator: "Raed Shafeek",
    publisher: brandName[lang],
    alternates: pageAlternates(lang),
    // No title/description so Next.js fills og/twitter from each page's own; "./" resolves to the current page.
    openGraph: {
      type: "website",
      url: "./",
      locale: m.ogLocale,
      siteName: brandName[lang],
      images: [
        {
          url: logoUrl,
          width: images.logo.width,
          height: images.logo.height,
          alt: m.logoAlt,
        },
      ],
    },
    twitter: { card: "summary" },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & LangParams>) {
  const lang = await getLang(params);
  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={notoSansArabic.variable}
    >
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData(lang)),
          }}
        />
      </body>
    </html>
  );
}
