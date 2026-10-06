import Image from "next/image";
import Link from "next/link";
import {
  CTASection,
  FeatureStrip,
  ImageBand,
  PageShell,
  ProductCard,
} from "@/components/site";
import { copy, getLang, type LangParams } from "@/lib/i18n";
import { images } from "@/lib/images";
import { productCountLabel, products } from "@/lib/products";
import { whatsappMessage, whatsappUrl } from "@/lib/site";

export default async function HomePage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = copy[lang];
  return (
    <PageShell lang={lang}>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              {lang === "ar"
                ? "نقاء الذهب الأحمر · إنتاج مؤابي أصيل"
                : "Pure red gold · Authentic Moabite production"}
            </span>
            <h1>
              {lang === "ar" ? (
                <>
                  أصالة مؤاب،
                  <br />
                  <em>بين أيديكم.</em>
                </>
              ) : (
                <>
                  The authenticity of Moab,
                  <br />
                  <em>in your hands.</em>
                </>
              )}
            </h1>
            <p>
              {lang === "ar"
                ? "زعفرانكم — زراعة هوائية محلية نقية، تُقطف يدويًا بكل عناية لنقدّم لكم أعلى معايير الجودة والنكهة الأصيلة."
                : "zafraancom — pure, locally aeroponically grown saffron, hand-picked with care to bring you the highest standards of quality and authentic flavor."}
            </p>
            <div className="hero-actions">
              <a
                className="gold-button"
                href={whatsappUrl(whatsappMessage(lang))}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.orderNow}
                <span className="arrow" aria-hidden="true">↗</span>
              </a>
              <Link className="text-button" href={`/${lang}/about#story`}>
                {t.learn}
                <span className="arrow" aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <Image
              src={images.saffronBowl}
              alt={
                lang === "ar"
                  ? "زعفران فاخر في وعاء"
                  : "Premium saffron in a bowl"
              }
              preload
            />
            <div className="image-caption">
              <span>
                {lang === "ar" ? "حصاد بعناية" : "Harvested with care"}
              </span>
            </div>
          </div>
        </section>
        <FeatureStrip lang={lang} />
        <section className="section products-preview">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                {lang === "ar" ? "مختاراتنا" : "Our selection"}
              </span>
              <h2>
                {productCountLabel(lang)}
                {lang === "ar" ? "،" : ","}
                <br />
                <em>{lang === "ar" ? "قصة واحدة." : "one story."}</em>
              </h2>
            </div>
            <Link className="text-button" href={`/${lang}/products`}>
              {t.allProducts}
              <span className="arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product.id} lang={lang} product={product} />
            ))}
          </div>
        </section>
        <ImageBand
          image={images.saffronStigmas}
          alt={lang === "ar" ? "خيوط الزعفران الطازجة" : "Fresh saffron threads"}
        />
        <CTASection lang={lang} />
      </main>
    </PageShell>
  );
}
