import Link from "next/link";
import { notoSansArabic } from "@/lib/fonts";

export default function NotFound() {
  return (
    <html lang="ar" dir="rtl" className={notoSansArabic.variable}>
      <body className="antialiased">
        <main className="cta-section">
          <span className="eyebrow">404</span>
          <h2>
            الصفحة غير موجودة
            <br />
            <em>Page not found</em>
          </h2>
          <Link className="gold-button" href="/ar">
            الرئيسية
          </Link>
          <Link className="text-button" href="/en">
            Home
          </Link>
        </main>
      </body>
    </html>
  );
}
