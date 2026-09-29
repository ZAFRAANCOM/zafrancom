import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { copy, navLinks, type Lang } from "@/lib/i18n";
import { images } from "@/lib/images";
import { products } from "@/lib/products";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand" href={`/${lang}`}>
          <Image className="brand-logo" src={images.logo} alt="zafraancom" />
          <span className="sr-only">زعفرانكم</span>
        </Link>
        <p>
          {lang === "ar"
            ? "زعفران ومنتجاته، من إنتاج محلي مؤابي."
            : "Saffron and its products, locally produced in Muab."}
        </p>
      </div>
      <div className="footer-links">
        {navLinks(lang).map(([href, label]) => (
          <Link key={href} href={href}>
            {label}
          </Link>
        ))}
      </div>
      <div className="footer-contact">
        <a href="tel:0778472931">077 847 2931</a>
        <a href="mailto:mnysyah@gmail.com">mnysyah@gmail.com</a>
        <a
          href="https://www.instagram.com/zafraancom"
          target="_blank"
          rel="noopener noreferrer"
        >
          @zafraancom
        </a>
      </div>
      <div className="copyright">
        © 2026{" "}
        {lang === "ar"
          ? "زعفرانكم. جميع الحقوق محفوظة."
          : "zafraancom. All rights reserved."}
      </div>
    </footer>
  );
}

export function ProductCard({
  lang,
  product,
}: {
  lang: Lang;
  product: (typeof products)[number];
}) {
  const item = product[lang];
  return (
    <article className="product-card">
      <div className="product-card-image">
        <Image src={product.image} alt={item.name} />
      </div>
      <div className="product-card-body">
        <span className="eyebrow">
          {product.id === "saffron"
            ? "01"
            : product.id === "serum"
              ? "02"
              : "03"}
        </span>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="product-meta">
          <strong>{item.price}</strong>
          <Link href={`/${lang}/products#${product.id}`}>
            {copy[lang].view}
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function CTASection({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <section className="cta-section">
      <span className="eyebrow">
        {lang === "ar"
          ? "المحصول القادم بين يديك"
          : "The next harvest, in your hands"}
      </span>
      <h2>{lang === "ar" ? "اطلب منتجاتنا الآن" : "Order our products"}</h2>
      <a
        className="gold-button"
        href="https://wa.me/962778472931?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%B7%D9%84%D8%A8%20%D9%85%D9%86%20%D8%B2%D8%B9%D9%81%D8%B1%D8%A7%D9%86%D9%83%D9%85"
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.orderNow}
        <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}

export function PageShell({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header lang={lang} />
      {children}
      <Footer lang={lang} />
    </>
  );
}

export function ImageBand({
  image,
  alt,
}: {
  image: StaticImageData;
  alt: string;
}) {
  return (
    <div className="image-band">
      <Image src={image} alt={alt} fill sizes="100vw" />
    </div>
  );
}

export function ContactInfo({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <div className="contact-info">
      <span className="eyebrow">
        {lang === "ar" ? "تواصل معنا" : "Contact us"}
      </span>
      <a href="tel:0778472931">
        <small>{t.phone}</small>
        <strong>077 847 2931</strong>
      </a>
      <a href="https://wa.me/962778472931">
        <small>{t.whatsapp}</small>
        <strong>077 847 2931</strong>
      </a>
      <a href="mailto:mnysyah@gmail.com">
        <small>{t.email}</small>
        <strong>mnysyah@gmail.com</strong>
      </a>
      <a
        href="https://www.instagram.com/zafraancom"
        target="_blank"
        rel="noopener noreferrer"
      >
        <small>{t.instagram}</small>
        <strong>@zafraancom</strong>
      </a>
    </div>
  );
}

export function FeatureStrip({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <section className="feature-strip">
      {[t.natural, t.premium, t.value, t.local].map((item) => (
        <div key={item}>
          <strong>{item}</strong>
        </div>
      ))}
    </section>
  );
}
