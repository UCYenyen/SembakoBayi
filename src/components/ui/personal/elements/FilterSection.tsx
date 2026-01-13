import React from 'react'
import { Input } from '@/components/ui/shadcn-ui/input'
import { Button } from '@/components/ui/shadcn-ui/button'
import { Checkbox } from '@/components/ui/shadcn-ui/checkbox'
import { Label } from '@/components/ui/shadcn-ui/label'
import { Separator } from '@/components/ui/shadcn-ui/separator'
import { Card } from '@/components/ui/shadcn-ui/card'
import { SlidersHorizontal } from 'lucide-react'

export default function FilterSection({ className }: { className?: string }) {
    return (
        <Card className={`space-y-6 ${className} p-4`}>
            <div>
                <h2 className="text-2xl font-bold flex mb-4 items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5" /> Filter
                </h2>
                <h3 className="font-semibold mb-4 text-lg">Kategori</h3>
                <div className="space-y-3">
                    {['Susu Formula', 'Popok Bayi', 'Pakaian', 'Perawatan Kulit', 'Makanan Pendamping'].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                            <Checkbox id={category} />
                            <Label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                {category}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            <Separator />
            <div>
                <h3 className="font-semibold mb-4 text-lg">Harga</h3>
                <div className="flex gap-2 items-center">
                    <Input type="number" placeholder="Min" className="h-9 text-sm" />
                    <span className="text-muted-foreground">-</span>
                    <Input type="number" placeholder="Max" className="h-9 text-sm" />
                </div>
            </div>
            <Separator />
            <div>
                <h3 className="font-semibold mb-4 text-lg">Rating</h3>
                <div className="space-y-3">
                    {[5, 4, 3].map((star) => (
                        <div key={star} className="flex items-center space-x-2">
                            <Checkbox id={`star-${star}`} />
                            <Label htmlFor={`star-${star}`} className="text-sm">
                                {star} Bintang ke atas
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
            <Button className="w-full mt-4">Terapkan Filter</Button>
        </Card>
    )
}
