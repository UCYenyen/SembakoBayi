import React from 'react'
import TestimonialCard from "@/components/ui/personal/elements/TestimonialCard"
import { Button } from '@/components/ui/shadcn-ui/button'
export default function TestimonialsSection() {
    return (
        <section className='relative w-full flex flex-col items-center justify-start overflow-hidden space-y-12 md:space-y-24'>
            <h1 className='text-5xl font-bold'>Produk Populer</h1>
            <div className='w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5} />
                <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5} />
                <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5} />
                <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5} />
                <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5} extraClasses='hidden md:inline-block' />
                <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5} extraClasses='hidden md:inline-block' />
                <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5} extraClasses='hidden md:inline-block' />
                <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5} extraClasses='hidden md:inline-block' />
            </div>
            <Button variant="default" className='z-10'>Lihat Semua Testimonial</Button>
            <div className='bg-linear-to-b absolute w-full h-full from-background/5 to-background'></div>
        </section>
    )
}
