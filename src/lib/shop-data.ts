import strawberry from "@/assets/gelato-strawberry.jpg";
import cottonCandy from "@/assets/gelato-cottoncandy.jpg";
import chocolate from "@/assets/gelato-chocolate.jpg";

export type Category = "Buah" | "Cokelat" | "Kacang" | "Susu" | "Vegan";

export type Gelato = {
  id: string;
  name: string;
  category: Category;
  price: number;
  oldPrice?: number;
  image: string;
  tagline: string;
  description: string;
  ingredients: string[];
  rating: number;
  badge?: string;
};

export const categories: Category[] = ["Buah", "Cokelat", "Kacang", "Susu", "Vegan"];

export const gelatos: Gelato[] = [
  {
    id: "strawberry-fields",
    name: "Strawberry Fields",
    category: "Buah",
    price: 32000,
    image: strawberry,
    tagline: "Stroberi segar dipetik pagi hari",
    description:
      "Gelato stroberi lembut dengan potongan buah asli. Manisnya pas, asamnya menyegarkan, teksturnya creamy tanpa terasa berat.",
    ingredients: ["Stroberi segar", "Susu segar", "Gula tebu", "Krim"],
    rating: 4.9,
    badge: "Terlaris",
  },
  {
    id: "cotton-candy-cloud",
    name: "Cotton Candy Cloud",
    category: "Susu",
    price: 34000,
    oldPrice: 40000,
    image: cottonCandy,
    tagline: "Selembut awan permen kapas",
    description:
      "Rasa permen kapas klasik dengan aroma vanila lembut. Warna biru pastelnya alami dari ekstrak bunga telang.",
    ingredients: ["Susu segar", "Ekstrak bunga telang", "Vanila", "Gula tebu"],
    rating: 4.8,
    badge: "Promo",
  },
  {
    id: "dark-chocolate-72",
    name: "Dark Chocolate 72%",
    category: "Cokelat",
    price: 36000,
    image: chocolate,
    tagline: "Cokelat single origin Aceh",
    description:
      "Pekat, intens, dan sedikit pahit di ujung lidah. Dibuat dari cokelat single origin 72% tanpa pemanis tambahan berlebih.",
    ingredients: ["Kakao 72%", "Susu segar", "Gula tebu"],
    rating: 4.9,
  },
  {
    id: "pistachio-siciliano",
    name: "Pistachio Siciliano",
    category: "Kacang",
    price: 42000,
    image: chocolate,
    tagline: "Pistachio panggang khas Sisilia",
    description:
      "Pistachio dipanggang perlahan lalu digiling halus menjadi pasta. Gurih, wangi, dan sangat khas.",
    ingredients: ["Pistachio", "Susu segar", "Krim", "Gula tebu"],
    rating: 4.7,
    badge: "Premium",
  },
  {
    id: "mango-sorbetto",
    name: "Mango Sorbetto",
    category: "Vegan",
    price: 30000,
    image: strawberry,
    tagline: "Sorbet mangga harum manis",
    description:
      "Tanpa susu, tanpa krim — hanya mangga harum manis, air, dan gula. Segar dan ringan untuk siang yang panas.",
    ingredients: ["Mangga harum manis", "Air", "Gula tebu", "Lemon"],
    rating: 4.6,
    badge: "Vegan",
  },
  {
    id: "vanilla-bourbon",
    name: "Vanilla Bourbon",
    category: "Susu",
    price: 31000,
    image: cottonCandy,
    tagline: "Vanila utuh dari Papua",
    description:
      "Vanila bourbon asli dengan bintik biji yang terlihat. Sederhana, tapi jadi favorit sepanjang masa.",
    ingredients: ["Vanila bourbon", "Susu segar", "Kuning telur", "Krim"],
    rating: 4.8,
  },
  {
    id: "hazelnut-bacio",
    name: "Hazelnut Bacio",
    category: "Kacang",
    price: 38000,
    oldPrice: 44000,
    image: chocolate,
    tagline: "Hazelnut bertemu cokelat susu",
    description:
      "Perpaduan klasik Italia: hazelnut panggang dan cokelat susu lembut yang meleleh pelan di mulut.",
    ingredients: ["Hazelnut", "Cokelat susu", "Susu segar", "Krim"],
    rating: 4.8,
    badge: "Promo",
  },
  {
    id: "lychee-rose",
    name: "Lychee Rose",
    category: "Buah",
    price: 35000,
    image: strawberry,
    tagline: "Leci dengan sentuhan mawar",
    description:
      "Leci manis berpadu aroma mawar yang halus. Ringan, wangi, dan terasa elegan.",
    ingredients: ["Leci", "Air mawar", "Susu segar", "Gula tebu"],
    rating: 4.7,
  },
  {
    id: "coconut-vegan",
    name: "Coconut Dream",
    category: "Vegan",
    price: 33000,
    image: cottonCandy,
    tagline: "Santan kelapa muda pilihan",
    description:
      "Dibuat dengan santan kelapa muda segar, creamy tanpa produk susu sama sekali.",
    ingredients: ["Santan kelapa muda", "Gula kelapa", "Air"],
    rating: 4.6,
    badge: "Vegan",
  },
  {
    id: "matcha-uji",
    name: "Matcha Uji",
    category: "Susu",
    price: 39000,
    image: cottonCandy,
    tagline: "Matcha ceremonial grade",
    description:
      "Matcha Uji dengan rasa umami dan sedikit pahit yang seimbang dengan manis susu.",
    ingredients: ["Matcha Uji", "Susu segar", "Krim", "Gula tebu"],
    rating: 4.7,
  },
  {
    id: "triple-choco",
    name: "Triple Choco Fudge",
    category: "Cokelat",
    price: 40000,
    image: chocolate,
    tagline: "Tiga lapis cokelat sekaligus",
    description:
      "Cokelat hitam, cokelat susu, dan fudge brownies dalam satu scoop untuk pencinta cokelat sejati.",
    ingredients: ["Kakao", "Cokelat susu", "Brownies", "Susu segar"],
    rating: 4.9,
    badge: "Baru",
  },
  {
    id: "blueberry-yogurt",
    name: "Blueberry Yogurt",
    category: "Buah",
    price: 34000,
    image: strawberry,
    tagline: "Yogurt asam segar & blueberry",
    description:
      "Yogurt rumahan yang asam segar dipadu blueberry manis. Pilihan ringan setelah makan berat.",
    ingredients: ["Yogurt", "Blueberry", "Susu segar", "Madu"],
    rating: 4.5,
  },
];

export const promos = [
  {
    id: "buy2get1",
    title: "Beli 2 Gratis 1",
    detail: "Setiap Jumat sampai Minggu, scoop ketiga gratis untuk semua rasa.",
    code: "SWEET3",
    accent: "berry" as const,
  },
  {
    id: "student",
    title: "Diskon Pelajar 20%",
    detail: "Tunjukkan kartu pelajar atau mahasiswa di kasir, berlaku setiap hari.",
    code: "BELAJAR20",
    accent: "sky" as const,
  },
  {
    id: "family",
    title: "Family Pint Bundle",
    detail: "Tiga pint pilihan hanya Rp 249.000, hemat sampai Rp 60.000.",
    code: "PINT3",
    accent: "mint" as const,
  },
];

export const stores = [
  {
    id: "senopati",
    name: "Gelato Senopati",
    address: "Jl. Senopati Raya No. 21, Jakarta Selatan",
    hours: "10.00 - 22.00 WIB",
    phone: "021 5550 1121",
  },
  {
    id: "dago",
    name: "Gelato Dago",
    address: "Jl. Ir. H. Juanda No. 88, Bandung",
    hours: "10.00 - 23.00 WIB",
    phone: "022 5550 4432",
  },
  {
    id: "seminyak",
    name: "Gelato Seminyak",
    address: "Jl. Kayu Aya No. 9, Badung, Bali",
    hours: "09.00 - 23.00 WITA",
    phone: "0361 5550 778",
  },
];

export const formatIDR = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export const getGelato = (id: string) => gelatos.find((g) => g.id === id);
