# zafraancom (زعفرانكم)

A bilingual (Arabic/English) website for zafraancom, a producer of Jordanian saffron and saffron products.

Live at **https://zafraancom.com**.

## Tech stack

- **Next.js 16** (App Router) built as a fully static site
- **React 19** and **TypeScript** in strict mode
- **Tailwind CSS 4**, plus hand-written component styles in `app/globals.css`
- **next/font** for self-hosted Noto Sans Arabic
- **pnpm 12** as the package manager
- **GitHub Pages** for hosting, deployed through GitHub Actions

## Getting started

Requirements: Node 24 (the version CI uses) and pnpm 12. The pnpm version is pinned in `package.json` under `packageManager`, so running `corepack enable` once picks up the right version automatically.

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

| Command          | What it does                                        |
| ---------------- | --------------------------------------------------- |
| `pnpm dev`       | Starts the local dev server with hot reload         |
| `pnpm build`     | Builds the static site into `out/`                  |
| `pnpm typecheck` | Runs the TypeScript compiler without emitting files |

To preview a production build locally, serve the `out/` folder with any static server, for example `npx serve out`. `pnpm start` does not work with a static export.

## Project structure

```
app/
  layout.tsx            Root layout: global metadata and viewport only
  page.tsx              "/" redirects to the visitor's language
  not-found.tsx         Bilingual 404 page
  sitemap.ts            Generates sitemap.xml
  robots.ts             Generates robots.txt
  globals.css           Design tokens and all component styles
  [lang]/
    layout.tsx          Per-language <html>, SEO metadata, JSON-LD
    page.tsx            Home
    products/page.tsx   Products
    about/page.tsx      About us and team
    order/page.tsx      Order form and contact details
components/
  header.tsx            Navigation, mobile menu, language switcher
  site.tsx              Shared sections: footer, product card, CTA, page shell
  order-form.tsx        Order form that sends to WhatsApp
  language-redirect.tsx Client-side redirect used by "/"
lib/
  site.ts               Domain, brand name, contact details, WhatsApp helpers
  products.ts           Product catalog, prices, price formatting
  team.ts               Team members shown on the About page
  i18n.ts               Languages, shared UI text, navigation links
  images.ts             Central registry of every image
  fonts.ts              Font setup
assets/images/          Source images (imported, not served directly)
public/                 Static files copied as-is into the build
.github/workflows/      Build and deploy pipeline
```

## How it works

### Static site, no server

`next.config.mjs` sets `output: "export"`, so `pnpm build` pre-renders every page to plain HTML in `out/`. Nothing runs on a server at request time. Image optimization is turned off (`images.unoptimized`) because it needs a server. Images are resized before they're added to `assets/images/` instead.

### Two languages, one set of pages

Every page lives under `app/[lang]/`. `generateStaticParams` builds exactly two versions of each page, `/ar/...` and `/en/...`, and `dynamicParams = false` makes any other language segment a 404. `getLang()` in `lib/i18n.ts` checks the segment before a page renders.

The `[lang]` layout sets `lang` and `dir` on `<html>`, so Arabic pages render right-to-left and English pages left-to-right. That is why the root `app/layout.tsx` only returns its children: the language layout below it owns the `<html>` tag. `app/page.tsx` and `app/not-found.tsx` sit outside `[lang]`, so they render their own.

Visiting `/` sends people to the language they last chose (saved in `localStorage`) or to Arabic by default. The header's language switcher swaps `/ar` and `/en` in the current URL and keeps the rest of the path.

Text that appears on several pages, such as nav labels and buttons, lives in `copy` in `lib/i18n.ts`. Text that belongs to a single page sits in that page as an `ar`/`en` pair.

### Orders go through WhatsApp

The site has no backend, no database and no payment processing. The order form (`components/order-form.tsx`) puts the customer's details into a pre-filled WhatsApp message and opens it. The customer presses Send in WhatsApp, and the order arrives on the business number in `lib/site.ts`. If the browser blocks the new tab, the form opens WhatsApp in the same tab instead.

### SEO

- Each page exports `generateMetadata` with a localized title and description.
- `pageAlternates()` in `lib/site.ts` adds the canonical URL and the `hreflang` links between the Arabic and English versions.
- `app/[lang]/layout.tsx` adds Open Graph and Twitter card data, plus Organization structured data (JSON-LD).
- `app/sitemap.ts` and `app/robots.ts` generate `sitemap.xml` and `robots.txt` at build time.

## Common edits

| To change…                     | Edit                                                  |
| ------------------------------ | ----------------------------------------------------- |
| Phone, email, Instagram        | `contact` in `lib/site.ts`                            |
| WhatsApp greeting message      | `whatsappMessage()` in `lib/site.ts`                  |
| Products, prices, descriptions | `lib/products.ts`                                     |
| Team members                   | `lib/team.ts`                                         |
| Nav labels and shared buttons  | `copy` in `lib/i18n.ts`                               |
| Colors                         | The `:root` variables at the top of `app/globals.css` |
| Page text                      | The page file under `app/[lang]/`                     |

### Products and prices

`price` in `lib/products.ts` is a plain number. `formatPrice()` turns it into display text, including the correct Arabic plural form for dinars. When you change products, also update:

- the meta descriptions in `app/[lang]/products/page.tsx` (they list each product and its price) and `app/[lang]/order/page.tsx` (it lists the products)
- the `01` / `02` / `03` labels in `ProductCard` in `components/site.tsx`, which are matched to product `id`s

### Images

1. Add the file to `assets/images/`. Most photos are 1080×1080 JPEGs.
2. Import it in `lib/images.ts` and add it to the `images` object.
3. Use it as `images.yourImage`.

Importing images instead of linking to `/public` lets Next.js read their dimensions and give them cache-safe file names.

### Adding a page

1. Create `app/[lang]/<name>/page.tsx`. Copy the shape of `app/[lang]/products/page.tsx`: a `meta` object with `ar` and `en`, a `generateMetadata` that calls `pageAlternates(lang, "/<name>")`, and content wrapped in `PageShell`.
2. Add the link to `navLinks()` in `lib/i18n.ts`.
3. Add `"/<name>"` to `paths` in `app/sitemap.ts`.

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`:

1. Install dependencies
2. Type-check (`pnpm typecheck`)
3. Build (`pnpm build`)
4. Upload `out/` and deploy it to GitHub Pages

If the type check or build fails, nothing is deployed and the live site stays on the last good version. Run `pnpm typecheck && pnpm build` locally before pushing to catch the same errors. The custom domain is configured in the repository's **Settings → Pages**.
