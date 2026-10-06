import type { Metadata } from "next";
import { OrderForm } from "@/components/order-form";
import { ContactInfo, PageShell } from "@/components/site";
import { getLang, type LangParams } from "@/lib/i18n";
import { pageAlternates } from "@/lib/site";

const meta = {
  ar: {
    title: "اطلب الآن وتواصل معنا",
    description:
      "اطلبوا زعفرانًا أردنيًا وسيروم وأبصال الزعفران عبر واتساب. عبّئوا النموذج وسنتواصل معكم لتأكيد طلبكم.",
  },
  en: {
    title: "Order & Contact",
    description:
      "Order Jordanian saffron, serum and saffron bulbs via WhatsApp. Fill in the form and we will contact you to confirm your order.",
  },
};

export async function generateMetadata({
  params,
}: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return { ...meta[lang], alternates: pageAlternates(lang, "/order") };
}

export default async function OrderPage({ params }: LangParams) {
  const lang = await getLang(params);
  return (
    <PageShell lang={lang}>
      <main className="order-page page-main">
        <section className="order-intro page-intro">
          <span className="eyebrow">
            {lang === "ar" ? "الطلب / تواصل معنا" : "Order / Contact"}
          </span>
          <h1>
            {lang === "ar" ? (
              <>
                دعوا الذهب الأحمر
                <br />
                <em>يصل إليكم.</em>
              </>
            ) : (
              <>
                Let nature’s gold
                <br />
                <em>reach you.</em>
              </>
            )}
          </h1>
          <p>
            {lang === "ar"
              ? "عبّئوا النموذج وسنتواصل معكم لتأكيد طلبكم."
              : "Fill in the form and we will contact you to confirm your order."}
          </p>
        </section>
        <section className="order-layout">
          <div className="form-panel">
            <span className="eyebrow">
              {lang === "ar" ? "بيانات الطلب" : "Order details"}
            </span>
            <OrderForm lang={lang} />
          </div>
          <ContactInfo lang={lang} />
        </section>
      </main>
    </PageShell>
  );
}
