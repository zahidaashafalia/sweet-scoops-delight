import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Snowflake, Sparkles, Truck } from "lucide-react";
import heroImage from "@/assets/hero-gelato.jpg";
import { ProductCard } from "@/components/ProductCard";
import { gelatos, promos } from "@/lib/shop-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gelato Nuvola — Gelato Artisan Pastel Manis di Kota Kamu" },
      {
        name: "description",
        content:
          "Gelato artisan dibuat harian dalam batch kecil. Jelajahi 12 rasa, nikmati promo mingguan, dan pesan favoritmu dalam hitungan detik.",
      },
      { property: "og:title", content: "Gelato Nuvola — Gelato Artisan Pastel Manis" },
      {
        property: "og:description",
        content: "12 rasa gelato artisan, promo mingguan, dan tiga toko manis untuk kamu kunjungi.",
      },
    ],
  }),
  component: Home,
});

const highlights = [
  { icon: Snowflake, title: "Dibuat harian", text: "Batch kecil setiap pagi, tanpa stok semalam." },
  { icon: Leaf, title: "Bahan lokal", text: "Susu segar dan buah dari petani mitra kami." },
  { icon: Truck, title: "Antar tetap beku", text: "Kemasan dry ice untuk area Jabodetabek." },
];

function Home() {
  const featured = gelatos.slice(0, 4);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-blob bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-40 h-80 w-80 animate-blob bg-secondary/40 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full bg-candy px-4 py-1.5 text-sm font-bold text-foreground/80 shadow-soft">
              <Sparkles className="h-4 w-4" /> Batch baru setiap pagi
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              Sesendok kebahagiaan
              <span className="block text-primary">rasa permen kapas</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
              Gelato artisan lembut dengan susu segar, buah lokal, dan resep Italia. Manisnya pas,
              teksturnya awan.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/katalog"
                className="group inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3 font-bold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                Pesan sekarang
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/promo"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 font-bold transition-transform duration-300 hover:-translate-y-0.5 hover:text-primary"
              >
                Lihat promo
              </Link>
            </div>
            <dl className="mt-10 flex gap-8">
              {[
                ["12", "rasa artisan"],
                ["3", "toko manis"],
                ["4.8", "rating pelanggan"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-extrabold text-primary">{v}</dt>
                  <dd className="text-xs text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="animate-float">
            <img
              src={heroImage}
              alt="Tiga cone gelato rasa stroberi, permen kapas, dan vanila melayang di latar pastel"
              width={1280}
              height={1024}
              className="w-full rounded-4xl object-cover shadow-float"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className="card-lift animate-rise rounded-3xl border border-border/70 bg-card p-6 shadow-soft"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-candy text-foreground/80">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-bold">{title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Rasa paling dicari</h2>
            <p className="mt-2 text-muted-foreground">Empat favorit yang selalu habis duluan.</p>
          </div>
          <Link
            to="/katalog"
            className="shrink-0 text-sm font-bold text-primary transition-transform duration-300 hover:translate-x-1"
          >
            Semua rasa →
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((g, i) => (
            <ProductCard key={g.id} gelato={g} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <div className="overflow-hidden rounded-4xl bg-candy p-8 shadow-soft sm:p-12">
          <h2 className="font-display text-3xl font-extrabold">Promo minggu ini</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {promos.map((p) => (
              <div key={p.id} className="card-lift rounded-3xl bg-card/90 p-5">
                <h3 className="font-display text-lg font-bold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.detail}</p>
                <p className="mt-3 inline-block rounded-full bg-muted px-3 py-1 text-xs font-bold tracking-wide">
                  {p.code}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
