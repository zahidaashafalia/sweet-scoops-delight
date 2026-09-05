import { Link } from "@tanstack/react-router";
import { Heart, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { formatIDR, type Gelato } from "@/lib/shop-data";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";

export function ProductCard({ gelato, index = 0 }: { gelato: Gelato; index?: number }) {
  const { addToCart, toggleFavorite, isFavorite } = useShop();
  const fav = isFavorite(gelato.id);

  return (
    <article
      className="card-lift animate-rise group relative overflow-hidden rounded-3xl border border-border/70 bg-card p-3 shadow-soft"
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <Link to="/produk/$id" params={{ id: gelato.id }} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-muted">
          <img
            src={gelato.image}
            alt={`Gelato rasa ${gelato.name}`}
            loading="lazy"
            width={768}
            height={768}
            className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          {gelato.badge && (
            <span className="absolute left-3 top-3 rounded-full bg-cta px-3 py-1 text-xs font-bold text-primary-foreground shadow-soft">
              {gelato.badge}
            </span>
          )}
        </div>
      </Link>

      <button
        type="button"
        aria-label={fav ? "Hapus dari favorit" : "Tambah ke favorit"}
        onClick={() => {
          toggleFavorite(gelato.id);
          toast(fav ? "Dihapus dari favorit" : `${gelato.name} masuk favorit 💖`);
        }}
        className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-background/85 backdrop-blur transition-transform duration-300 hover:scale-110 active:scale-90"
      >
        <Heart className={cn("h-4 w-4 transition-colors", fav ? "fill-primary text-primary" : "text-muted-foreground")} />
      </button>

      <div className="px-1.5 pb-1 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to="/produk/$id" params={{ id: gelato.id }}>
              <h3 className="truncate font-display text-lg font-bold transition-colors group-hover:text-primary">
                {gelato.name}
              </h3>
            </Link>
            <p className="truncate text-sm text-muted-foreground">{gelato.tagline}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-muted px-2 py-1 text-xs font-bold">
            <Star className="h-3 w-3 fill-primary text-primary" /> {gelato.rating}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-lg font-bold text-primary">{formatIDR(gelato.price)}</p>
            {gelato.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatIDR(gelato.oldPrice)}</p>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              addToCart(gelato.id);
              toast.success(`${gelato.name} ditambahkan ke keranjang`);
            }}
            className="flex shrink-0 items-center gap-1 rounded-full bg-cta px-4 py-2 text-sm font-bold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
          >
            <Plus className="h-4 w-4" /> Tambah
          </button>
        </div>
      </div>
    </article>
  );
}
