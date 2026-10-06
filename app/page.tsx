import type { Metadata } from "next";
import { LanguageRedirect } from "@/components/language-redirect";
import { notoSansArabic } from "@/lib/fonts";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function RootPage() {
  return (
    <html lang="ar" dir="rtl" className={notoSansArabic.variable}>
      <body className="antialiased">
        <LanguageRedirect />
      </body>
    </html>
  );
}
