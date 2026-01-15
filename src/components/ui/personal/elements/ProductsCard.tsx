import React from 'react'
import {
    CardProduct, CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/shadcn-ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/shadcn-ui/button'
import { PlusIcon } from 'lucide-react'
import { ProductCardProps } from '@/types/product.md'
import { FaStar } from 'react-icons/fa6'
export default function ProductsCard(product : ProductCardProps) {
    return (
        <CardProduct className=''>
            <CardHeader className="space-y-1 relative flex flex-col justify-start items-center">
                <Image unoptimized src={product.imageSrc} alt={product.name} width={900} height={900} draggable="false" loading='lazy' className="h-auto z-1 w-full rounded-lg aspect-square" />
                {product.isOnSale && (
                    <div className='absolute -top-10 px-2 py-1 rounded-lg text-sm bg-destructive text-white uppercase font-bold z-2'>Promo</div>
                )}
                {/* <div className='absolute bottom-4 right-7  md:bottom-6 md:right-8 px-1 py-1 md:px-4 md:py-2 rounded-lg text-sm md:text-lg z-2 bg-primary/70 text-primary-foreground'>{stock} pcs</div> */}
            </CardHeader>
            <CardContent>
                <div className='flex gap-1 items-center justify-center pb-4'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar key={index} className={index < product.rating ? "text-amber-300" : "text-muted-foreground"} />
                    ))}
                </div>
                <CardTitle className="text-xl font-bold text-center">{product.name}</CardTitle>
                <CardDescription className="text-center">
                    {product.isOnSale ? (
                        <div className='flex flex-col md:flex-row md:space-x-2 items-center justify-center'>
                            <span className="text-sm text-red-400 line-through">
                                Rp {(product.price).toLocaleString('id-ID')}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                Rp {(product.price - product.discountAmount).toLocaleString('id-ID')}
                            </span>
                        </div>
                    ) : <>  Rp {product.price.toLocaleString('id-ID')}</>}

                </CardDescription>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 h-full items-end justify-end">
                <Button className="w-full flex gap-2 justify-center items-center"><PlusIcon className="h-4 w-4" /> Keranjang</Button>
                <Button variant="outline" className="w-full">Lihat Detail</Button>
            </CardFooter>
        </CardProduct>
    )
}
