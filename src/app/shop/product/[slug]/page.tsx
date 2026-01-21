import React from 'react'
import { Product } from '@/types/product.md'
import { getProductDetails } from '@/lib/services/product'
import { PageProps } from '@/types/page-prop.md'
import { Card, CardDescription, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/shadcn-ui/card'
export default async function page({params}: PageProps) {
  const resolvedParams = await params; 
  const { slug } = resolvedParams;
  const product: Product = await getProductDetails(slug);

  return (
    <main className='flex flex-col gap-4 min-h-screen justify-center items-start'>
      <h1 className='text-3xl font-bold'>Product Detail Page</h1>
      <Card className='w-full md:w-1/2'>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{product.description}</p>
          <p>Price: Rp {product.price.toLocaleString('id-ID')}</p>
          <p>Stock: {product.stock}</p>
        </CardContent>
        <CardFooter>
          <CardAction>
            <button className='px-4 py-2 bg-blue-500 text-white rounded'>Add to Cart</button>
          </CardAction>
        </CardFooter>
      </Card>
    </main>
  )
}
