"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { readSavedLang } from "@/lib/i18n";

export function LanguageRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/${readSavedLang() ?? "ar"}`);
  }, [router]);
  return (
    <main className="cta-section">
      <Link className="gold-button" href="/ar">
        العربية
      </Link>
      <Link className="text-button" href="/en">
        English
      </Link>
    </main>
  );
}
