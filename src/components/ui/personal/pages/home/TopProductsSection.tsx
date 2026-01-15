import React from 'react'
import Image from "next/image"
import ProductsCard from '@/components/ui/personal/elements/ProductsCard'
import { ProductCardProps } from '@/types/product.md'
interface TopProductsSectionProps {
    products?: ProductCardProps[]
}

export default function TopProductsSection({ products }: TopProductsSectionProps) {
    return (
        <section className='w-full bg-card relative flex flex-col items-center space-y-12 md:space-y-24'>
            <h1 className='text-5xl font-bold'>Produk Populer</h1>
            {products && products.length === 0 ? (
                <div className='py-24 text-center text-muted-foreground'>Tidak ada produk populer tersedia.</div>
            ) : <div className='w-[90%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {products && products.map((product) => (
                    <ProductsCard key={product.id} {...product} />
                ))}
            </div>}
            <Image src="/images/misc/pink-waves.svg" draggable="false" alt="background waves" width={900} height={900} className="h-auto z-1 w-full" />
        </section>
    )
}
