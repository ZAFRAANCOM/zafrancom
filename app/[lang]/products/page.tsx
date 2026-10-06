import type { Metadata } from "next";
import Image from "next/image";
import { CTASection, PageShell } from "@/components/site";
import { copy, getLang, type LangParams } from "@/lib/i18n";
import { formatPrice, products } from "@/lib/products";
import { pageAlternates, whatsappMessage, whatsappUrl } from "@/lib/site";

const meta = {
  ar: {
    title: "زعفران أردني وسيروم وأبصال الزعفران",
    description:
      "تسوّق زعفران أردني أصيل (1 غرام بـ 8 دنانير)، وسيروم الزعفران للوجه 10 مل (7 دنانير)، وأبصال الزعفران الجاهزة للزراعة (دينار للبصلة).",
  },
  en: {
    title: "Jordanian Saffron, Serum & Bulbs",
    description:
      "Shop authentic Jordanian saffron (1g, 8 JD), saffron face serum (10ml, 7 JD) and saffron bulbs ready for planting (1 JD per bulb).",
  },
};

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return { ...meta[lang], alternates: pageAlternates(lang, "/products") };
}

export default async function ProductsPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = copy[lang];
  return (
    <PageShell lang={lang}>
      <main className="page-main">
        <section className="page-intro">
          <span className="eyebrow">
            {lang === "ar" ? "المنتجات" : "Products"}
          </span>
          <h1>
            {lang === "ar" ? (
              <>
                من الأرض،
                <br />
                <em>إلى طاولتكم.</em>
              </>
            ) : (
              <>
                From the earth,
                <br />
                <em>to your table.</em>
              </>
            )}
          </h1>
          <p>
            {lang === "ar"
              ? "منتجات طبيعية من زعفرانكم، تحمل جوهر الزعفران المحلي."
              : "Natural products carrying the essence of local saffron."}
          </p>
        </section>
        <section className="product-list">
          {products.map((product, index) => {
            const item = product[lang];
            const [title, variant] = item.name.split(" — ");
            return (
              <article
                className="product-detail"
                id={product.id}
                key={product.id}
              >
                <div className="detail-image">
                  <Image src={product.image} alt={item.name} />
                </div>
                <div className="detail-copy">
                  <span className="eyebrow">
                    0{index + 1} / {lang === "ar" ? "منتج" : "Product"}
                  </span>
                  <h2>
                    {title}
                    {variant && <span className="detail-variant">{variant}</span>}
                  </h2>
                  <strong className="price">
                    {formatPrice(product, lang)}
                  </strong>
                  <p>{item.description}</p>
                  {item.ingredients && (
                    <>
                      <h3 className="ingredients-title">
                        {lang === "ar" ? "المكونات" : "Ingredients"}
                      </h3>
                      <ul className="ingredients">
                        {item.ingredients.map((ingredient) => (
                          <li key={ingredient}>{ingredient}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  <a
                    className="gold-button"
                    href={whatsappUrl(whatsappMessage(lang, item.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.orderNow}
                    <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            );
          })}
        </section>
        <CTASection lang={lang} />
      </main>
    </PageShell>
  );
}
