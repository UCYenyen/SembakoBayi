import React from 'react'
import Image from "next/image"
import ProductsCard from '@/components/ui/personal/elements/ProductsCard'
export default function TopProductsSection() {
    return (
        <section className='w-full bg-card relative flex flex-col items-center space-y-12 md:space-y-24'>
            <h1 className='text-5xl font-bold'>Produk Populer</h1>
            <div className='w-[90%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                <ProductsCard id='1' name="Apel" rating={4} imageSrc="/images/products/Apel50.webp" price={50000} isOnSale={true} discountAmount={2000} />
                <ProductsCard id='2' name="Jeruk" rating={5} imageSrc="/images/products/Blueberry25.webp" price={60000} isOnSale={false} discountAmount={0}/>
                <ProductsCard id='3' name="Apel" rating={4} imageSrc="/images/products/Apel50.webp" price={50000} isOnSale={true} discountAmount={4000} />
                <ProductsCard id='4' name="Jeruk" rating={5} imageSrc="/images/products/Blueberry25.webp" price={60000} isOnSale={false} discountAmount={0} />
                <ProductsCard id='5' name="Apel" rating={4} imageSrc="/images/products/Apel50.webp" price={50000} isOnSale={false} discountAmount={0} />
                <ProductsCard id='6' name="Jeruk" rating={5} imageSrc="/images/products/Blueberry25.webp" price={60000} isOnSale={false} discountAmount={0} />
                <ProductsCard id='7' name="Apel" rating={4} imageSrc="/images/products/Apel50.webp" price={50000} isOnSale={false} discountAmount={0} />
                <ProductsCard id='8' name="Jeruk" rating={5} imageSrc="/images/products/Blueberry25.webp" price={60000} isOnSale={false} discountAmount={0} />
            </div>
            <Image src="/images/misc/pink-waves.svg" draggable="false" alt="background waves" width={900} height={900} className="h-auto z-1 w-full" />
        </section>
    )
}
