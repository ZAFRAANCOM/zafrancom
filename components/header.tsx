"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { copy, navLinks, pathForLang, saveLang, type Lang } from "@/lib/i18n";
import { images } from "@/lib/images";
import { brandName, whatsappMessage, whatsappUrl } from "@/lib/site";

function LanguageSwitcher({
  lang,
  onSwitch,
}: {
  lang: Lang;
  onSwitch: () => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const next: Lang = lang === "ar" ? "en" : "ar";
  const href = pathForLang(pathname, next);
  return (
    <Link
      className="language-switcher"
      href={href}
      onClick={(event) => {
        saveLang(next);
        onSwitch();
        // Plain clicks navigate manually so the current #section is kept; modified clicks open a tab as usual.
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        router.push(href + window.location.hash);
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
          alt={brandName[lang]}
          preload
        />
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
          href={whatsappUrl(whatsappMessage(lang))}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
        >
          {t.orderNow}
          <span className="arrow" aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
