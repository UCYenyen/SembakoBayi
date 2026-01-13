'use client'

import ProductsCard from '@/components/ui/personal/elements/ProductsCard'
import { Button } from '@/components/ui/shadcn-ui/button'
import { SlidersHorizontal } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/shadcn-ui/pagination"
import FilterSection from '@/components/ui/personal/elements/FilterSection'
import { useState } from 'react'
import { ProductCardProps } from '@/types/product.md'

interface ShopSectionProps {
    Products: ProductCardProps[]
}

export default function ShopSection({ Products }: ShopSectionProps) {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
    return (
        <div className="w-[90%] py-6 md:py-10 mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
                <aside className="hidden md:block w-64 shrink-0">
                    <div className="sticky top-18">
                        <FilterSection />
                    </div>
                </aside>

                <div className="flex flex-col gap-12">
                    <div className='flex flex-col gap-4 w-full'>
                        <div className="space-y-4 md:hidden">
                            <Button
                                variant="outline"
                                className="w-full flex gap-2"
                                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                {isMobileFilterOpen ? 'Tutup Filter' : 'Tampilkan Filter'}
                            </Button>

                            {isMobileFilterOpen && (
                                <div className="mt-4 animate-in slide-in-from-top-2">
                                    <FilterSection />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {Products.map((product) => (
                                <ProductsCard
                                    key={product.id}
                                    {...product}
                                />
                            ))}
                        </div>
                    </div>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>

                </div>
            </div>
        </div>
    )
}
