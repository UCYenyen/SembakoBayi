import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardProduct, CardTitle } from '@/components/ui/shadcn-ui/card';
import { getAllFeaturedProducts } from '@/lib/services/product'
export default async function page() {
  const products = await getAllFeaturedProducts();
  return (
    
  )
}
