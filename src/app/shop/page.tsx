import ShopSection from '@/components/ui/personal/pages/shop/ShopSection'

export default function ShopPage() {
  const dummyProducts = Array.from({ length: 12 }).map((_, i) => ({
    id: crypto.randomUUID(),
    name: `Produk Bayi Premium ${i + 1}`,
    price: (i + 1) * 50000 + 100000,
    rating: Math.floor(Math.random() * 2) + 4,
    imageSrc: `/images/products/Apel50.webp`,
    isOnSale: false,
    discountAmount: 25000,
  }))

  return (
    <main className="min-h-screen w-full bg-background py-12">
      <ShopSection Products={dummyProducts} />
    </main>
  )
}