import { Link } from "@tanstack/react-router";
import { IceCream2, Instagram, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-candy/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-cta text-primary-foreground">
              <IceCream2 className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold">Gelato Nuvola</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Gelato artisan dibuat harian dalam batch kecil, dengan susu segar dan buah lokal pilihan.
          </p>
        </div>

        <div className="text-sm">
          <h3 className="font-display text-base font-bold">Jelajahi</h3>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li><Link to="/katalog" className="transition-colors hover:text-primary">Katalog rasa</Link></li>
            <li><Link to="/promo" className="transition-colors hover:text-primary">Promo</Link></li>
            <li><Link to="/lokasi" className="transition-colors hover:text-primary">Lokasi toko</Link></li>
            <li><Link to="/tentang" className="transition-colors hover:text-primary">Tentang kami</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <h3 className="font-display text-base font-bold">Hubungi</h3>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> 021 5550 1121</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Senopati, Dago, Seminyak</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 shrink-0" /> @gelatonuvola</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gelato Nuvola. Dibuat manis setiap hari.
      </div>
    </footer>
  );
}
