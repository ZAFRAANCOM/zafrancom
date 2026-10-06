import { notFound } from "next/navigation";

export const langs = ["ar", "en"] as const;

export type Lang = (typeof langs)[number];

export type LangParams = { params: Promise<{ lang: string }> };

function isLang(value: string): value is Lang {
  return (langs as readonly string[]).includes(value);
}

export const langStorageKey = "zafraancom-lang";

// Storage can throw (private mode, blocked site data), so language memory is best-effort.
export function readSavedLang(): Lang | null {
  try {
    const saved = window.localStorage.getItem(langStorageKey);
    return saved && isLang(saved) ? saved : null;
  } catch {
    return null;
  }
}

export function saveLang(lang: Lang) {
  try {
    window.localStorage.setItem(langStorageKey, lang);
  } catch {}
}

// Swap only the first path segment so "/ar/x" becomes "/en/x" without touching the rest.
export function pathForLang(pathname: string, lang: Lang) {
  const segments = pathname.split("/");
  segments[1] = lang;
  return segments.join("/");
}

export async function getLang(params: LangParams["params"]): Promise<Lang> {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return lang;
}

export const copy = {
  ar: {
    home: "الرئيسية",
    products: "المنتجات",
    about: "من نحن",
    order: "الطلب / تواصل معنا",
    orderNow: "اطلب الآن",
    sendViaWhatsapp: "أرسل الطلب عبر واتساب",
    allProducts: "كل المنتجات",
    view: "عرض المنتج",
    learn: "اكتشف قصتنا",
    natural: "طبيعية",
    premium: "فاخرة",
    value: "قيمة غذائية عالية",
    local: "إنتاج محلي",
    phone: "الهاتف",
    whatsapp: "واتساب",
    email: "البريد الإلكتروني",
    instagram: "إنستغرام",
    menu: "القائمة",
    close: "إغلاق",
  },
  en: {
    home: "Home",
    products: "Products",
    about: "About Us",
    order: "Order / Contact",
    orderNow: "Order Now",
    sendViaWhatsapp: "Send order via WhatsApp",
    allProducts: "All products",
    view: "View Product",
    learn: "Discover our story",
    natural: "Natural",
    premium: "Premium",
    value: "High nutritional value",
    local: "Locally produced",
    phone: "Phone",
    whatsapp: "WhatsApp",
    email: "Email",
    instagram: "Instagram",
    menu: "Menu",
    close: "Close",
  },
};

export function navLinks(lang: Lang) {
  const t = copy[lang];
  return [
    [`/${lang}`, t.home],
    [`/${lang}/products`, t.products],
    [`/${lang}/about`, t.about],
    [`/${lang}/order`, t.order],
  ];
}
