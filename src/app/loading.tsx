import React from 'react'
import { Metadata } from 'next'
import { FaSpinner } from 'react-icons/fa6'
import { Card } from '@/components/ui/shadcn-ui/card'

export const metadata: Metadata = {
  title: "Loading...",
  description: "Please wait while the content is loading.",
}
export default function loading() {
  return (
    <main className="overflow-hidden min-h-screen justify-center items-center flex flex-col gap-4">
      <Card className="w-full sm:max-w-112.5 shadow-lg">
        <FaSpinner className="animate-spin text-4xl" />
        <h1 className="text-4xl font-bold text-center">Memuat...</h1>
        <p className="text-center mt-4">Harap tunggu sementara konten dimuat.</p>
      </Card>
    </main>
  )
}