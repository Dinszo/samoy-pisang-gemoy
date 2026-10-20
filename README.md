# Samoy Pisang Gemoy — Framer-inspired Redesign

Website React + Vite single-page mengikuti PRD 14 Oktober 2026. Desain terinspirasi dari rekaman referensi Framer (layout editorial, tipografi tebal tetapi lebih kecil, ribbon bergerak, warna pastel). Bukan salinan template atau aset komersial pihak ketiga.

## Menjalankan

```bash
npm install
npm run dev
```

Buka alamat lokal yang muncul (biasanya http://localhost:5173/).

## Memeriksa dan merapikan

```bash
npm run format
npm run build
```

## Mengganti informasi resmi

- `src/data/siteData.js`: harga, deskripsi menu, tautan kontak resmi
- `public/images/logo-pisang-gemoy.jpeg`: logo asli dari file pengguna (sudah disertakan)
- Kartu produk memakai placeholder hingga foto produk asli tersedia; jangan mengganti dengan foto stok jika bukan produk asli.
- Kontak kosong ditampilkan sebagai "SEGERA HADIR" tanpa tautan aktif.
- Testimonials memakai empty state sampai ada testimoni asli.

## Sections

Home, Our Menu, About Us, Why Choose Us, Testimonials, How to Order, Contact, Footer.

## Animasi

CSS keyframes untuk floating logo dan ribbon; IntersectionObserver untuk reveal. Mendukung reduced motion dan keyboard focus.
