import type { Lang } from "@/lib/i18n";
import { images } from "@/lib/images";

export const products = [
  {
    id: "saffron",
    image: images.saffronJar,
    price: 8,
    ar: {
      name: "زعفران أردني — 1 غرام",
      description: "زعفران مؤابي محلي، مزروع بالطريقة الهوائية، نقي ومجفف بعناية.",
    },
    en: {
      name: "Jordanian Saffron — 1g",
      description:
        "Local Moabite saffron, aeroponically grown, pure and carefully dried.",
    },
  },
  {
    id: "serum",
    image: images.saffronSerum,
    price: 7,
    ar: {
      name: "سيروم الزعفران للوجه — 10 مل",
      description:
        "سيروم تجميلي للتقليل من مظهر التجاعيد، مكوَّن من زيت الزعفران النقي ومدعَّم بفيتامين B5 وزيت جوز الهند، يمنح البشرة ترطيبًا ومرونة طبيعية.",
      ingredients: ["زيت الزعفران", "فيتامين B5", "زيت جوز الهند"],
    },
    en: {
      name: "Saffron Face Serum — 10ml",
      description:
        "A cosmetic serum that helps reduce the look of wrinkles, made with pure saffron oil and enriched with vitamin B5 and coconut oil for natural hydration and elasticity.",
      ingredients: ["Saffron oil", "Vitamin B5", "Coconut oil"],
    },
  },
  {
    id: "bulbs",
    image: images.saffronBulbs,
    price: 1,
    unit: "bulb",
    ar: {
      name: "أبصال الزعفران — حجم كبير",
      description: "أبصال محلية مؤابية جاهزة للزراعة والإنتاج.",
    },
    en: {
      name: "Large Saffron Bulbs",
      description: "Large local Moabite bulbs ready for planting and production.",
    },
  },
];

export type Product = (typeof products)[number];

// Arabic counted nouns change form by number: 1, 2, 3–10, 11+.
function arabicDinars(amount: number) {
  if (amount === 1) return "دينار واحد";
  if (amount === 2) return "ديناران";
  if (amount <= 10) return `${amount} دنانير`;
  return `${amount} دينارًا`;
}

export function formatPrice(product: Product, lang: Lang) {
  if (lang === "ar") {
    const price = arabicDinars(product.price);
    return product.unit === "bulb" ? `${price} للبصلة` : price;
  }
  const price = `${product.price} JD`;
  return product.unit === "bulb" ? `${price} per bulb` : price;
}

const countWords: Record<Lang, Record<number, string>> = {
  ar: { 2: "منتجان", 3: "ثلاثة منتجات", 4: "أربعة منتجات", 5: "خمسة منتجات", 6: "ستة منتجات" },
  en: { 2: "Two products", 3: "Three products", 4: "Four products", 5: "Five products", 6: "Six products" },
};

export function productCountLabel(lang: Lang) {
  const n = products.length;
  return countWords[lang][n] ?? (lang === "ar" ? `${n} منتجات` : `${n} products`);
}
