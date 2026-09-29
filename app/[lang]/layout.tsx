import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { getLang, langs, type Lang, type LangParams } from "@/lib/i18n";
import { images } from "@/lib/images";

const siteUrl = "https://zafraancom.com";
const logoUrl = images.logo.src;

const localizedMetadata: Record<
  Lang,
  {
    title: string;
    titleTemplate: string;
    description: string;
    ogLocale: string;
    ogTitle: string;
    ogDescription: string;
    twitterDescription: string;
    logoAlt: string;
  }
> = {
  ar: {
    title: "زعفرانكم | zafraancom",
    titleTemplate: "%s | زعفرانكم",
    description: "زعفران أردني أصيل ومنتجاته الطبيعية — جودة مختارة بلمسة محلية.",
    ogLocale: "ar_JO",
    ogTitle: "زعفرانكم | زعفران أردني أصيل",
    ogDescription: "اكتشف الزعفران الأردني الأصيل ومنتجاته الطبيعية المختارة.",
    twitterDescription: "زعفران أردني أصيل ومنتجات طبيعية بلمسة محلية.",
    logoAlt: "شعار زعفرانكم",
  },
  en: {
    title: "zafraancom | زعفرانكم",
    titleTemplate: "%s | zafraancom",
    description:
      "Authentic Jordanian saffron and its natural products — carefully selected, locally grown.",
    ogLocale: "en_US",
    ogTitle: "zafraancom | Authentic Jordanian Saffron",
    ogDescription:
      "Discover authentic Jordanian saffron and its carefully selected natural products.",
    twitterDescription:
      "Authentic Jordanian saffron and natural products, locally grown.",
    logoAlt: "zafraancom logo",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "زعفرانكم",
  alternateName: "zafraancom",
  url: siteUrl,
  logo: new URL(logoUrl, siteUrl).href,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+962778472931",
    contactType: "sales",
    areaServed: "JO",
    availableLanguage: ["ar", "en"],
  },
  sameAs: ["https://wa.me/962778472931"],
};

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
    keywords: [
      "زعفران أردني",
      "زعفران",
      "منتجات الزعفران",
      "زيت الزعفران",
      "zafraancom",
      "Jordanian saffron",
    ],
    authors: [{ name: "زعفرانكم" }],
    creator: "زعفرانكم",
    publisher: "زعفرانكم",
    openGraph: {
      type: "website",
      locale: m.ogLocale,
      siteName: "زعفرانكم | zafraancom",
      title: m.ogTitle,
      description: m.ogDescription,
      images: [
        {
          url: logoUrl,
          width: images.logo.width,
          height: images.logo.height,
          alt: m.logoAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.twitterDescription,
      images: [logoUrl],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode } & LangParams>) {
  const lang = await getLang(params);
  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
