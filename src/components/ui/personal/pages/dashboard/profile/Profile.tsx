'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/shadcn-ui/card'
import { Button } from '@/components/ui/shadcn-ui/button'
import { Input } from '@/components/ui/shadcn-ui/input'
import { Label } from '@/components/ui/shadcn-ui/label'
import { Separator } from '@/components/ui/shadcn-ui/separator'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/shadcn-ui/avatar'
import { Badge } from '@/components/ui/shadcn-ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/shadcn-ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/shadcn-ui/dialog"
import {
    Camera,
    Plus,
    Pencil,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react'

import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

export default function Profile() {
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSendVerification = async () => {
        if (!formData.phoneNumber) {
            toast.error("Masukkan nomor telepon terlebih dahulu");
            return;
        }
        setIsLoading(true);
        try {
            await authClient.phoneNumber.sendOtp({ phoneNumber: formData.phoneNumber });
            await new Promise(r => setTimeout(r, 1000));
            setIsOtpDialogOpen(true);
        } catch (error) {
            toast.error("Gagal mengirim kode verifikasi");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setIsLoading(true);

        try {
            await authClient.phoneNumber.verify({
                phoneNumber: formData.phoneNumber,
                code: otpCode, 
                disableSession: false,
                updatePhoneNumber: true,
            });

            await new Promise(r => setTimeout(r, 1000));
            setIsOtpDialogOpen(false);
            toast.success("Nomor telepon berhasil diverifikasi!");
            router.refresh();
        } catch (error) {
            toast.error("Gagal memverifikasi kode OTP");
        } finally {
            setIsLoading(false);
        }
    }

    if (!session || !session.user) {
        return <div className="flex justify-center mt-10"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <section className='flex my-[20%] md:my-[5%] flex-col min-h-screen w-full px-4 items-center justify-start'>

            <Card className='w-full max-w-3xl shadow-lg'>

                <CardHeader className='flex flex-row items-start gap-6 pb-6'>
                    <div className='relative group'>
                        <Avatar className='w-28 h-28 border-4 border-white shadow-sm cursor-pointer group-hover:opacity-90 transition-opacity'>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full border-2 border-white cursor-pointer hover:bg-primary/90 transition-colors'>
                            <Camera className="w-4 h-4" />
                            <input type="file" className="hidden" accept="image/*" />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 mt-2'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>{formData.name || "User"}</h2>
                            <p className='text-sm text-muted-foreground'>{session.user.role}</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-fit gap-2">
                            <Camera className="w-3 h-3" /> Ganti Foto
                        </Button>
                    </div>
                </CardHeader>

                <Separator />

                <CardContent className='space-y-8 py-6'>

                    <div className='grid gap-6'>
                        <div>
                            <h3 className='text-lg font-medium'>Informasi Pribadi</h3>
                            <p className='text-sm text-muted-foreground'>
                                Perbarui detail foto dan informasi pribadi Anda.
                            </p>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor="name">Nama</Label>
                            <div className="relative">
                                <Input
                                    id="name"
                                    placeholder="Contoh: Budi"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="pr-10" 
                                />
                                <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none opacity-50" />
                            </div>
                        </div>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                            <div className='space-y-2'>
                                <Label htmlFor="email">Email</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="budi@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="pr-10"
                                    />
                                    <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none opacity-50" />
                                </div>
                            </div>

                            <div className='space-y-2'>
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="phoneNumber">Nomor Telepon</Label>

                                    {session.user.phoneNumberVerified ? (
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Terverifikasi
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
                                            <AlertCircle className="w-3 h-3" /> Belum Verifikasi
                                        </Badge>
                                    )}
                                </div>

                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r pr-3">
                                        <span className="text-lg">🇮🇩</span>
                                        <span className="text-sm font-medium text-muted-foreground">+62</span>
                                    </div>

                                    <Input
                                        id="phoneNumber"
                                        type="tel"
                                        className="pl-24 pr-10"
                                        placeholder="812-3456-7890"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                    <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none opacity-50" />
                                </div>

                                {!session.user.phoneNumberVerified && (
                                    <div className="pt-1">
                                        <p className="text-[0.8rem] text-muted-foreground mb-2">
                                            Nomor Anda belum terverifikasi. Fitur keamanan tertentu mungkin terbatas.
                                        </p>
                                        <Button
                                            type="button"
                                            variant="secondary"
                                            size="sm"
                                            onClick={handleSendVerification}
                                            disabled={isLoading || !formData.phoneNumber}
                                            className="w-full"
                                        >
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                            Kirim Kode Verifikasi (OTP)
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='space-y-2'>
                            <Label>Alamat Utama</Label>
                            <div className="flex gap-3">
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Pilih alamat pengiriman..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="home">Rumah - Jl. Mawar No. 10, Surabaya</SelectItem>
                                        <SelectItem value="office">Kantor - Graha Pena Lt. 5, Surabaya</SelectItem>
                                        <SelectItem value="parents">Rumah Orang Tua - Jl. Melati, Malang</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="secondary" className="whitespace-nowrap gap-2">
                                    <Plus className="w-4 h-4" /> Baru
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <Separator />

                <CardFooter className='flex justify-between py-6 bg-slate-50/50 rounded-b-xl'>
                    <div className='flex gap-4'>
                        <Button variant="outline">Batalkan</Button>
                        <Button disabled={isLoading}>Simpan Perubahan</Button>
                    </div>
                </CardFooter>

            </Card>

            <Dialog open={isOtpDialogOpen} onOpenChange={setIsOtpDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Masukkan Kode OTP</DialogTitle>
                        <DialogDescription>
                            Kami telah mengirimkan kode verifikasi ke WhatsApp/SMS nomor <strong>+62 {formData.phoneNumber}</strong>
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 py-4">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="otp" className="sr-only">OTP</Label>
                            <Input
                                id="otp"
                                placeholder="Masukkan 6 digit kode"
                                className="text-center text-lg tracking-widest"
                                maxLength={6}
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-start">
                        <Button
                            type="button"
                            variant="default"
                            className="w-full"
                            onClick={handleVerifyOtp}
                            disabled={isLoading || otpCode.length < 4}
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                            Verifikasi
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </section>
    )
}