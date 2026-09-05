import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatIDR } from "@/lib/shop-data";
import { useShop } from "@/lib/shop-store";

export const Route = createFileRoute("/keranjang")({
  head: () => ({
    meta: [
      { title: "Keranjang Belanja | Gelato Nuvola" },
      { name: "description", content: "Periksa pesanan gelato kamu sebelum lanjut ke pembayaran." },
      { property: "og:title", content: "Keranjang Belanja | Gelato Nuvola" },
      { property: "og:description", content: "Periksa pesanan gelato kamu sebelum lanjut ke pembayaran." },
    ],
  }),
  component: Keranjang,
});

function Keranjang() {
  const { cartItems, subtotal, setQty, removeFromCart } = useShop();
  const delivery = subtotal > 0 ? 15000 : 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-display text-4xl font-extrabold">Keranjang</h1>

      {cartItems.length === 0 ? (
        <div className="mt-10 rounded-4xl border border-dashed border-border p-14 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-candy">
            <ShoppingBag className="h-6 w-6" />
          </span>
          <p className="mt-4 font-display text-xl font-bold">Keranjangmu masih kosong</p>
          <p className="mt-1 text-sm text-muted-foreground">Yuk pilih rasa favoritmu dulu.</p>
          <Link
            to="/katalog"
            className="mt-6 inline-block rounded-full bg-cta px-6 py-3 font-bold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5"
          >
            Jelajahi katalog
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <ul className="space-y-4">
            {cartItems.map(({ gelato, qty }) => (
              <li
                key={gelato.id}
                className="animate-rise grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-3xl border border-border/70 bg-card p-4 shadow-soft"
              >
                <img
                  src={gelato.image}
                  alt={gelato.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                />
                <div className="min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="truncate font-display text-lg font-bold">{gelato.name}</h2>
                      <p className="text-sm text-muted-foreground">{formatIDR(gelato.price)}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Hapus ${gelato.name}`}
                      onClick={() => removeFromCart(gelato.id)}
                      className="shrink-0 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 rounded-full border border-border p-1">
                      <button
                        type="button"
                        aria-label="Kurangi"
                        onClick={() => setQty(gelato.id, qty - 1)}
                        className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-muted active:scale-90"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-7 text-center text-sm font-bold">{qty}</span>
                      <button
                        type="button"
                        aria-label="Tambah"
                        onClick={() => setQty(gelato.id, qty + 1)}
                        className="grid h-8 w-8 place-items-center rounded-full transition-colors hover:bg-muted active:scale-90"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="font-display font-bold text-primary">{formatIDR(gelato.price * qty)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-3xl border border-border/70 bg-candy p-6 shadow-soft lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-bold">Ringkasan</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-bold">{formatIDR(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Pengantaran beku</dt>
                <dd className="font-bold">{formatIDR(delivery)}</dd>
              </div>
              <div className="flex justify-between border-t border-border/70 pt-3 text-base">
                <dt className="font-display font-bold">Total</dt>
                <dd className="font-display font-extrabold text-primary">{formatIDR(subtotal + delivery)}</dd>
              </div>
            </dl>
            <Link
              to="/checkout"
              className="mt-6 block rounded-full bg-cta px-6 py-3 text-center font-bold text-primary-foreground shadow-soft transition-transform duration-300 hover:-translate-y-0.5 active:scale-95"
            >
              Lanjut ke checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
