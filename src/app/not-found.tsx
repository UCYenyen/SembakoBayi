import React from 'react'
import { Metadata } from 'next'
import { TriangleAlert } from 'lucide-react'
import { Card } from '@/components/ui/shadcn-ui/card'

export const metadata: Metadata = {
  title: "Tidak Ditemukan",
  description: "Sumber daya yang diminta tidak ditemukan.",
}

export default function notFound() {
  return (
    <main className="overflow-hidden min-h-screen justify-center items-center flex flex-col gap-4">
      <Card className="w-full sm:max-w-112.5 shadow-lg flex justify-center items-center flex-col gap-6 p-8">
        <div className='p-4 flex justify-center items-center bg-gray-200 rounded-full'>
          <TriangleAlert className="w-12 h-12 text-black" />
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className="text-4xl font-bold text-center">Tidak Ditemukan</h1>
          <p className="text-center mt-4">Maaf, halaman yang Anda cari tidak tersedia.</p>
        </div>
      </Card>
    </main>
  )
}
