import React from 'react'
import Image from "next/image"
import ProductsCard from '@/components/ui/personal/elements/ProductsCard'
export default function TopProductsSection() {
    return (
        <section className='w-full bg-card relative flex flex-col items-center space-y-24'>
            <h1 className='text-5xl font-bold'>Produk Populer</h1>
            <div className='w-[90%] grid grid-cols-2 md:grid-cols-4 gap-8'>
                <ProductsCard />
                <ProductsCard />
                <ProductsCard />
                <ProductsCard />
                <ProductsCard />
                <ProductsCard />
                <ProductsCard />
                <ProductsCard />
            </div>
            <Image src="/images/misc/pink-waves.svg" draggable="false" alt="background waves" width={900} height={900} className="h-auto z-1 w-full" />
        </section>
    )
}
