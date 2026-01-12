'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/shadcn-ui/carousel"
import { Card, CardContent } from "@/components/ui/shadcn-ui/card"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

export default function HeroSection() {
    const plugin = React.useRef(
        Autoplay({ delay: 10000, stopOnInteraction: true })
    )
    return (
        <>
            <Carousel
                plugins={[plugin.current]}
                className="w-[90%]"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index}>
                            <div className="p-1">
                                <Card>
                                    <CardContent className="flex w-full h-96 items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="relative w-full mt-12">
                <Image src="/images/misc/bg-waves.svg" draggable="false" width={900} height={900} alt="background waves" className="h-auto absolute z-1 bottom-6 md:bottom-14 left-0 w-full" />
                <Image src="/images/misc/fr-waves.svg" draggable="false" width={900} height={900} alt="front waves" className="h-auto relative z-2 bottom-0 left-0 w-full" />
            </div>
        </>
    )
}
