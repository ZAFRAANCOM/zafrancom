import type { Lang } from "@/lib/i18n";

export const siteUrl = "https://zafraancom.com";

export const brandName: Record<Lang, string> = {
  ar: "زعفرانكم",
  en: "zafraancom",
};

export const contact = {
  phoneIntl: "+962778472931",
  phoneDisplay: "077 847 2931",
  email: "mnysyah@gmail.com",
  instagramUrl: "https://www.instagram.com/zafraancom",
  instagramHandle: "@zafraancom",
};

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${contact.phoneIntl.slice(1)}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function whatsappMessage(lang: Lang, productName?: string) {
  if (lang === "ar")
    return productName
      ? `مرحبًا، أرغب بطلب ${productName} من زعفرانكم`
      : "مرحبًا، أرغب بالطلب من زعفرانكم";
  return productName
    ? `Hello, I would like to order ${productName} from zafraancom`
    : "Hello, I would like to place an order with zafraancom";
}

// Canonical plus hreflang links; `path` is the page path after the language segment ("" for home).
export function pageAlternates(lang: Lang, path = "") {
  return {
    canonical: `/${lang}${path}`,
    languages: { ar: `/ar${path}`, en: `/en${path}`, "x-default": `/ar${path}` },
  };
}
