import React from 'react'
import TestimonialCard from "@/components/ui/personal/elements/TestimonialCard"
export default function TestimonialsSection() {
    return (
        <div className='w-[90%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5}/>
            <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5}/>
            <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5}/>
            <TestimonialCard name='banana' role='guest' imageSrc='/images/products/Apel50.webp' description='banana' rating={5}/>
        </div>
    )
}
