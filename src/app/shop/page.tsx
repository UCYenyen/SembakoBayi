import ShopSection from '@/components/ui/personal/pages/shop/ShopSection'
import { Metadata } from 'next'
import { getAllProduct } from '@/lib/services/product'
export const metadata: Metadata = {
  title: 'Belanja - SembakoBayi',
  description: 'Beli kebutuhan bayi Anda dengan mudah di SembakoBayi. Temukan berbagai produk berkualitas untuk si kecil. Belanja sekarang dan nikmati kemudahan berbelanja online!',
}

export default async function ShopPage() {
  const products = await getAllProduct(1);

  return (
    <main className="min-h-screen w-full bg-background py-12">
      <ShopSection Products={products} />
    </main>
  )
}