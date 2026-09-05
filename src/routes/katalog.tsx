import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { categories, gelatos } from "@/lib/shop-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/katalog")({
  head: () => ({
    meta: [
      { title: "Katalog Gelato — Buah, Cokelat, Kacang & Vegan | Gelato Nuvola" },
      {
        name: "description",
        content:
          "Telusuri 12 rasa gelato artisan berdasarkan kategori atau pencarian. Dari Strawberry Fields sampai Pistachio Siciliano.",
      },
      { property: "og:title", content: "Katalog Gelato Nuvola" },
      {
        property: "og:description",
        content: "12 rasa gelato artisan dengan kategori buah, cokelat, kacang, susu, dan vegan.",
      },
    ],
  }),
  component: Katalog,
});

function Katalog() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>("Semua");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return gelatos.filter((g) => {
      const matchCat = active === "Semua" || g.category === active;
      const matchQuery =
        !q || g.name.toLowerCase().includes(q) || g.tagline.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
  }, [query, active]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl font-extrabold">Katalog gelato</h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        Semua rasa dibuat harian. Pilih kategori atau cari rasa favoritmu.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        <label className="relative block max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari rasa, misalnya pistachio…"
            aria-label="Cari gelato"
            className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm outline-none transition-shadow focus:shadow-soft focus:ring-2 focus:ring-ring/50"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {["Semua", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5",
                active === c
                  ? "bg-cta text-primary-foreground shadow-soft"
                  : "border border-border bg-card text-muted-foreground hover:text-primary",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">{results.length} rasa ditemukan</p>

      {results.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-border p-12 text-center">
          <p className="font-display text-lg font-bold">Belum ada rasa yang cocok</p>
          <p className="mt-1 text-sm text-muted-foreground">Coba kata kunci lain atau pilih kategori Semua.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((g, i) => (
            <ProductCard key={g.id} gelato={g} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
