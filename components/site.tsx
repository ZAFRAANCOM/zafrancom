import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { copy, navLinks, type Lang } from "@/lib/i18n";
import { images } from "@/lib/images";
import { formatPrice, type Product } from "@/lib/products";
import { brandName, contact, whatsappMessage, whatsappUrl } from "@/lib/site";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand" href={`/${lang}`}>
          <Image className="brand-logo" src={images.logo} alt={brandName[lang]} />
        </Link>
        <p>
          {lang === "ar"
            ? "زعفران ومنتجاته، من إنتاج محلي مؤابي."
            : "Saffron and its products, locally produced in Moab."}
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
        <a href={`tel:${contact.phoneIntl}`}>
          <span dir="ltr">{contact.phoneDisplay}</span>
        </a>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
        <a
          href={contact.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span dir="ltr">{contact.instagramHandle}</span>
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
  product: Product;
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
          <strong>{formatPrice(product, lang)}</strong>
          <Link href={`/${lang}/products#${product.id}`}>
            {copy[lang].view}
            <span className="arrow" aria-hidden="true">↗</span>
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
          ? "المحصول القادم بين أيديكم"
          : "The next harvest, in your hands"}
      </span>
      <h2>{lang === "ar" ? "اطلب منتجاتنا الآن" : "Order our products"}</h2>
      <a
        className="gold-button"
        href={whatsappUrl(whatsappMessage(lang))}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t.orderNow}
        <span className="arrow" aria-hidden="true">↗</span>
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
      <a href={`tel:${contact.phoneIntl}`}>
        <small>{t.phone}</small>
        <strong>
          <span dir="ltr">{contact.phoneDisplay}</span>
        </strong>
      </a>
      <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
        <small>{t.whatsapp}</small>
        <strong>
          <span dir="ltr">{contact.phoneDisplay}</span>
        </strong>
      </a>
      <a href={`mailto:${contact.email}`}>
        <small>{t.email}</small>
        <strong>
          <span dir="ltr">{contact.email}</span>
        </strong>
      </a>
      <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer">
        <small>{t.instagram}</small>
        <strong>
          <span dir="ltr">{contact.instagramHandle}</span>
        </strong>
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
