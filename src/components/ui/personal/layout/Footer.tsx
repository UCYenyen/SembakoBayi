import React from 'react'
import Image from 'next/image'

export default function Footer() {
    return (
        <footer className="relative w-full flex flex-col text-white">
            <div className="w-full relative leading-[0]">
                <Image
                    draggable="false"
                    src="/images/misc/dark-pink-waves.svg"
                    alt="background waves"
                    width={1440} // Wajib diisi (asumsi lebar standar)
                    height={320} // Wajib diisi
                    className="h-auto absolute z-0 top-0 left-0 w-full"
                />
                <Image
                    draggable="false"
                    src="/images/misc/slate-waves.svg"
                    alt="front waves"
                    width={1440}
                    height={320}
                    className="relative h-auto w-full z-10"
                />
            </div>

            <div className="w-full flex justify-center items-center bg-[#334553] py-12">
                <div className="w-[80%] grid grid-cols-1 md:grid-cols-5 gap-12 items-start text-center md:text-left">
                    <div className="flex flex-col gap-2 md:col-span-3 items-center md:items-start">
                        <h3 className="text-3xl font-bold">SBP</h3>
                        <p className="text-gray-300 text-lg">Dapatkan yang terbaik untuk bayimu</p>
                    </div>
                    <div className="flex flex-col gap-4 items-center md:items-end">
                        <div className="w-full md:w-fit flex flex-col items-center md:items-start">
                            <h3 className="text-xl font-bold border-b border-gray-600 pb-2 w-full md:w-fit md:border-none mb-2">Kontak</h3>
                            <div className="flex flex-col gap-3">
                                <a className="hover:underline text-lg transition-colors" href="tel:+6281231847161">+62 812 3184 7161</a>
                                <a className="hover:underline text-lg transition-colors break-all" href="mailto:sembakobayi2@gmail.com">sembakobayi2@gmail.com</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 items-center md:items-end">
                        <div className="w-full md:w-fit flex flex-col items-center md:items-start">
                            <h3 className="text-xl font-bold border-b border-gray-600 pb-2 w-full md:w-fit md:border-none mb-2">Tautan Cepat</h3>
                            <nav className="flex flex-col gap-3">
                                <a href="/" className="hover:underline text-lg transition-colors">Home</a>
                                <a href="/shop" className="hover:underline text-lg transition-colors">Shop</a>
                                <a href="/dashboard" className="hover:underline text-lg transition-colors">Dashboard</a>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full border-t-2 border-[#445664] bg-[#334553] text-center py-4 text-gray-400">
                &copy; 2024 SBP. Semua hak dilindungi.
            </div>
        </footer>
    )
}