import React from 'react'
import { Metadata } from 'next'
import { FaSpinner } from 'react-icons/fa6'
import { Card, CardContent, CardDescription, CardFooter } from '@/components/ui/shadcn-ui/card'
import { CardHeader, CardTitle } from '@/components/ui/shadcn-ui/card'
import { Separator } from '@/components/ui/shadcn-ui/separator'
import Link from 'next/link'
import { TriangleAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: "Memuat...",
  description: "Harap tunggu sementara konten dimuat.",
}
export default function loading() {
  return (
    <section className='py-32 pt-48 w-screen overflow-hidden flex justify-center items-center'>
            <Card className='w-112.5 max-w-[80%] min-h-72 flex flex-col justify-between shadow-lg'>
                <CardHeader>
                    <div className='flex justify-center items-center gap-4'>
                        <CardTitle className='text-2xl'>Memuat</CardTitle>
                    </div>
                </CardHeader>
                <Separator />
                <CardContent>
                    <CardDescription className='text-center flex flex-col gap-4 items-center justify-center'>
                        <div className='p-4 flex justify-center items-center bg-gray-200 rounded-full'>
                           <FaSpinner className="animate-spin text-4xl" />
                        </div>
                        <p className='my-4 text-center w-[90%]'>Harap tunggu sementara konten dimuat.</p>
                    </CardDescription>
                </CardContent>
            </Card>
        </section>
  )
}