"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { copy, langStorageKey, navLinks, type Lang } from "@/lib/i18n";
import { images } from "@/lib/images";

function LanguageSwitcher({
  lang,
  onSwitch,
}: {
  lang: Lang;
  onSwitch: () => void;
}) {
  const pathname = usePathname();
  const next: Lang = lang === "ar" ? "en" : "ar";
  return (
    <Link
      className="language-switcher"
      href={pathname.replace(`/${lang}`, `/${next}`)}
      onClick={() => {
        window.localStorage.setItem(langStorageKey, next);
        onSwitch();
      }}
      aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      <span className={lang === "ar" ? "active" : ""}>ع</span>
      <span className="switch-slash">/</span>
      <span className={lang === "en" ? "active" : ""}>EN</span>
    </Link>
  );
}

export function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const t = copy[lang];
  const pathname = usePathname();
  return (
    <header className="site-header">
      <Link className="brand" href={`/${lang}`} onClick={() => setOpen(false)}>
        <Image
          className="brand-logo"
          src={images.logo}
          alt="zafraancom"
          preload
        />
        <span className="sr-only">زعفرانكم</span>
      </Link>
      <button
        className="menu-button"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "×" : "☰"}
        <span className="sr-only">{open ? t.close : t.menu}</span>
      </button>
      <nav className={open ? "main-nav open" : "main-nav"}>
        {navLinks(lang).map(([href, label]) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? "current" : ""}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <LanguageSwitcher lang={lang} onSwitch={() => setOpen(false)} />
        <a
          className="header-cta"
          href="https://wa.me/962778472931?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D8%A8%D8%A7%D9%84%D8%B7%D9%84%D8%A8%20%D9%85%D9%86%20%D8%B2%D8%B9%D9%81%D8%B1%D8%A7%D9%86%D9%83%D9%85"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          {t.orderNow}
          <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
