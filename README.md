**Attention**: This file is for developers and AI Agents to understand the codebase.

# Ders Portfolyosu (Next.js + MDX)

Bu proje, ders yuklemelerini MD/MDX dosyalarindan okuyup listeleyen bir portfolyo uygulamasidir.
Icerikler `content/uploads` altindan gelir; detay sayfalari App Router ile uretilir.

## Ozellikler

- Next.js 16 App Router + React 19 + TypeScript
- MD/MDX tabanli icerik yonetimi (`content/uploads`)
- Yuklemelerde tarih bazli siralama (en yeni ustte)
- Ek dosya linkleme (`AttachmentLink`) ve PDF gomume (`PdfEmbed`)
- Boxicons tabanli ikon kullanimi

## Gereksinimler

- Node.js 20+
- npm

## Kurulum ve Calistirma

```bash
npm install
npm run dev
```

Tarayicida ac:

- `http://localhost:3000`

## Komutlar

```bash
# gelistirme
npm run dev

# lint
npm run lint

# uretim build
npm run build

# uretim server
npm run start

# tip kontrolu
npx tsc --noEmit

# tek dosya lint
npx eslint app/uploads/[slug]/page.tsx
```

## Test Durumu

Bu repoda su an test runner (Jest/Vitest/Playwright) yok.

- `npm test` komutu tanimli degil.
- “Tek test” kosma su an mumkun degil.
- En yakin dogrulamalar:
  - `npx eslint <dosya-yolu>`
  - `npx tsc --noEmit`

## Proje Yapisi

```text
app/
  page.tsx                  # ana sayfa
  uploads/page.tsx          # tum yuklemeler
  uploads/[slug]/page.tsx   # yukleme detay
  globals.css               # tum global stiller

components/
  UploadCard.tsx
  UploadListItem.tsx
  SidePanel.tsx
  MdxComponents.tsx
  AttachmentLink.tsx
  PdfEmbed.tsx
  UploadIcon.tsx

lib/
  uploads.ts                # md/mdx okuma + frontmatter normalize
  dates.ts                  # tarih formatlama

content/uploads/            # kaynak icerik dosyalari (.md/.mdx)
public/uploads/             # statik ek dosyalar (pdf/docx/xlsx vb.)
```

## Yeni Yukleme Ekleme

1. `content/uploads/<slug>.mdx` dosyasi olustur.
2. Frontmatter ekle.
3. MDX icerigini yaz.
4. Ek dosya varsa `public/uploads/<slug>/` altina koy.
5. `npm run dev` ile kontrol et: `/uploads/<slug>`

### Frontmatter Ornegi

```mdx
---
title: "Egitimde Ornek Calisma"
date: "2026-02-27"
tags: ["ornek", "mdx"]
icon: "file"
description: "Kisa aciklama metni."
attachment: "yes"
---

# Baslik

Icerik buraya.
```

### Frontmatter Alanlari

- `title: string` (zorunluya yakin; yoksa slug kullanilir)
- `date: string` (`YYYY-MM-DD` onerilir; yoksa varsayilan tarih)
- `tags: string[]`
- `icon?: string` (onerilen: `file`, `chart`)
- `description?: string`
- `attachment: "yes" | "no"`

Not: UI listesinde yalnizca `.md` ve `.mdx` dosyalari okunur.

## Ek Dosyalar (PDF/DOCX/XLSX)

- Dosyalari su klasore koy:
  - `public/uploads/<slug>/`
- MDX icinde linklemek icin:

```mdx
<AttachmentLink href="/uploads/ornek/rapor.pdf" label="PDF indir" />
<AttachmentLink href="/uploads/ornek/odev.docx" label="DOCX indir" />
<AttachmentLink href="/uploads/ornek/tablo.xlsx" label="Excel indir" />
```

- PDF'yi sayfaya gommek icin:

```mdx
<PdfEmbed src="/uploads/ornek/rapor.pdf" title="Rapor (PDF)" />
```

## Ikonlar

Proje ikonlari Boxicons ile gelir (`boxicons`).

- CSS import: `app/layout.tsx`
- Ikon mapleme: `components/UploadIcon.tsx`
- Mevcut semantik degerler:
  - `file`
  - `chart`

## MDX Bilesenleri

Detay sayfasinda su bilesenler kullanilabilir:

- `AttachmentLink`
- `PdfEmbed`

Bu bilesenler `components/MdxComponents.tsx` uzerinden MDX'e baglanir.

## Sorun Giderme

- Yukleme listede gorunmuyor:
  - Dosya uzantisini kontrol et (`.md` / `.mdx` olmali).
  - Frontmatter hatasi var mi bak.
  - `date` alani gecerli mi kontrol et.
- PDF gorunmuyor:
  - Dosya yolu `public/uploads/...` altinda mi?
  - `attachment: "yes"` ayarlandi mi?
- Build/lint hatasi:
  - `npm run lint`
  - `npx tsc --noEmit`

## Notlar

- Kodlama stili, agent kurallari ve ayrintili teknik rehber icin `AGENTS.md` dosyasina bak.