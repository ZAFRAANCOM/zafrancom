"use client";

import { FormEvent, useState } from "react";
import { copy, type Lang } from "@/lib/i18n";
import { products } from "@/lib/products";

export function OrderForm({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    const formData = new FormData(event.currentTarget);
    const productId = String(formData.get("product") ?? "");
    const product = products.find((item) => item.id === productId);
    const message =
      lang === "ar"
        ? `مرحبًا زعفرانكم، أود طلب:\n\nالاسم: ${formData.get("name")}\nرقم الهاتف: ${formData.get("phone")}\nالعنوان: ${formData.get("address")}\nالمنتج: ${product?.ar.name ?? productId}\nالكمية: ${formData.get("quantity")}\nالملاحظات: ${formData.get("notes") || "لا يوجد"}`
        : `Hello zafraancom, I would like to place an order:\n\nName: ${formData.get("name")}\nPhone: ${formData.get("phone")}\nAddress: ${formData.get("address")}\nProduct: ${product?.en.name ?? productId}\nQuantity: ${formData.get("quantity")}\nNotes: ${formData.get("notes") || "None"}`;
    window.open(
      `https://wa.me/962778472931?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setBusy(false);
    setSent(true);
  }
  if (sent)
    return (
      <div className="success-state">
        <span className="success-mark">✓</span>
        <h2>
          {lang === "ar"
            ? "تم إرسال طلبك بنجاح"
            : "Your order has been submitted successfully"}
        </h2>
        <p>
          {lang === "ar"
            ? "شكرًا لتواصلك معنا. سنتواصل معك قريبًا لتأكيد التفاصيل."
            : "Thank you for contacting us. We will reach out shortly to confirm the details."}
        </p>
        <button
          className="text-button"
          type="button"
          onClick={() => setSent(false)}
        >
          {lang === "ar" ? "إرسال طلب آخر" : "Send another order"}
        </button>
      </div>
    );
  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="field-grid">
        <label>
          <span>{lang === "ar" ? "الاسم" : "Name"} *</span>
          <input name="name" required />
        </label>
        <label>
          <span>{lang === "ar" ? "رقم الهاتف" : "Phone Number"} *</span>
          <input name="phone" type="tel" required />
        </label>
      </div>
      <label>
        <span>{lang === "ar" ? "العنوان" : "Address"} *</span>
        <input name="address" required />
      </label>
      <div className="field-grid">
        <label>
          <span>{lang === "ar" ? "المنتج" : "Product"} *</span>
          <select name="product" required defaultValue="">
            <option value="" disabled>
              {lang === "ar" ? "اختر المنتج" : "Select a product"}
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product[lang].name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{lang === "ar" ? "الكمية" : "Quantity"} *</span>
          <input
            name="quantity"
            type="number"
            min="1"
            defaultValue="1"
            required
          />
        </label>
      </div>
      <label>
        <span>{lang === "ar" ? "الملاحظات" : "Notes"}</span>
        <textarea name="notes" rows={4} />
      </label>
      <button className="gold-button form-submit" type="submit" disabled={busy}>
        {busy ? (lang === "ar" ? "جارٍ الإرسال..." : "Sending...") : t.orderNow}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
