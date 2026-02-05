import React from 'react'
import { Product } from '@/types/product.md'
import { getProductDetails } from '@/lib/services/product'
import { PageProps } from '@/types/page-prop.md'
import { Card, CardDescription, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/shadcn-ui/card'
import Image from 'next/image'
import { Button } from '@/components/ui/shadcn-ui/button'
export default async function page({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const product: Product = await getProductDetails(slug);

  return (
    <main className='flex flex-col gap-4 min-h-screen justify-center items-center'>
      <section className='w-[90%] flex flex-col justify-center items-center'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image src={product.imageSrc} unoptimized alt={product.name} width={400} height={400} />
            <CardDescription>{product.description}</CardDescription>
            <CardDescription>Price: Rp {product.price.toLocaleString('id-ID')}</CardDescription>
            <CardDescription>Stock: {product.stock}</CardDescription>
          </CardContent>
          <CardFooter>
            <CardAction>
              <button className='px-4 py-2 bg-blue-500 text-white rounded'>Add to Cart</button>
            </CardAction>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}
