import { Metadata } from "next"
import HeroSection from "@/components/ui/personal/pages/home/HeroSection"
import TopProductsSection from "@/components/ui/personal/pages/home/TopProductsSection"
import TestimonialsSection from "@/components/ui/personal/pages/home/TestimonialsSection"

import { getAllPopularProducts } from "@/lib/services/product"

export const metadata: Metadata = {
  title: "Beranda - Sembako Bayi",
  description: "Sembako Bayi adalah website e-commerce yang menyediakan berbagai kebutuhan pokok untuk bayi dan balita dengan harga terjangkau dan kualitas terbaik.",
}

export default async function page() {
  const popularProducts = await getAllPopularProducts()
  return (
    <div className="flex flex-col items-center justify-center py-24 relative">
      <HeroSection />
      <TopProductsSection products={popularProducts} />
      <TestimonialsSection />
    </div>
  )
}