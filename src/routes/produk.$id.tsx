import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { formatIDR, gelatos, getGelato } from "@/lib/shop-data";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/produk/$id")({
  loader: ({ params }) => {
    const gelato = getGelato(params.id);
    if (!gelato) throw notFound();
    return { gelato };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Rasa tidak ditemukan | Gelato Nuvola" }, { name: "robots", content: "noindex" }] };
    }
    const { gelato } = loaderData;
    const title = `${gelato.name} — Gelato ${gelato.category} | Gelato Nuvola`;
    return {
      meta: [
        { title },
        { name: "description", content: gelato.description.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: gelato.tagline },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { gelato } = Route.useLoaderData();
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const [qty, setQty] = useState(1);
  const fav = isFavorite(gelato.id);
  const related = gelatos.filter((g) => g.category === gelato.category && g.id !== gelato.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/katalog" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-colors hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Kembali ke katalog
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-4xl bg-candy p-4 shadow-soft">
          <img
            src={gelato.image}
            alt={`Gelato rasa ${gelato.name}`}
            width={768}
            height={768}
            className="w-full rounded-3xl object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        <div className="animate-rise">
          <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-bold">{gelato.category}</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold">{gelato.name}</h1>
          <p className="mt-2 text-muted-foreground">{gelato.tagline}</p>

          <div className="mt-4 flex items-center gap-2 text-sm font-bold">
            <Star className="h-4 w-4 fill-primary text-primary" /> {gelato.rating}
            <span className="font-normal text-muted-foreground">· 240+ ulasan</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-3xl font-extrabold text-primary">{formatIDR(gelato.price)}</p>
            {gelato.oldPrice && (
              <p className="pb-1 text-sm text-muted-foreground line-through">{formatIDR(gelato.oldPrice)}</p>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-muted-foreground">{gelato.description}</p>

          <div className="mt-6">
            <h2 className="font-display text-base font-bold">Bahan utama</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {gelato.ingredients.map((i) => (
                <span key={i} className="rounded-full bg-muted px-3 py-1 text-sm">{i}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
              <button
                type="button"
                aria-label="Kurangi"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-muted active:scale-90"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold">{qty}</span>
              <button
                type="button"
                aria-label="Tambah"
                onClick={() => setQty((q) => q + 1)}
                className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-muted active:scale-90"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                addToCart(gelato.id, qty);
                toast.success(`${qty} × ${gelato.name} masuk keranjang`);
              }}
              className="flex-1 rounded-full bg-cta px-6 py-3 text-center font-bold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 active:scale-95 sm:flex-none"
            >
              Tambah ke keranjang
            </button>

            <button
              type="button"
              aria-label="Favorit"
              onClick={() => toggleFavorite(gelato.id)}
              className="grid h-12 w-12 place-items-center rounded-full border border-border bg-card transition-transform duration-300 hover:-translate-y-0.5 active:scale-90"
            >
              <Heart className={cn("h-5 w-5", fav ? "fill-primary text-primary" : "text-muted-foreground")} />
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-2xl font-extrabold">Rasa serupa</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((g, i) => (
              <ProductCard key={g.id} gelato={g} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
