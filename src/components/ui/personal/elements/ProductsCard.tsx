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

export default function ProductsCard() {
    return (
        <CardProduct>
            <CardHeader className="space-y-1">
                <Image src="/images/products/Apel50.webp" alt="apel" width={900} height={900} className="h-auto z-1 w-full rounded-lg" />
            </CardHeader>
            <CardContent>
                <CardTitle className="text-2xl font-bold text-center">Nama Produk</CardTitle>
                <CardDescription className="text-center">
                    Rp 00.000,00
                </CardDescription>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full flex gap-2 justify-center items-center"><PlusIcon className="h-4 w-4" /> Keranjang</Button>
                <Button variant="outline" className="w-full">Lihat Detail</Button>
            </CardFooter>
        </CardProduct>
    )
}
