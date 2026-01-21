import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client';

const connectionString = process.env.DATABASE_URL

const pool = new Pool({ 
  connectionString,
  
  // 1. Jumlah Koneksi Maksimal (PENTING)
  // Jumlah user "bersamaan" yang bisa dilayani database. 
  // Jika penuh, user ke-21 akan antre di memori Node.js, tidak ditolak.
  max: 50, 

  // 2. Jumlah Koneksi Minimal (Standby)
  // Koneksi yang selalu "siap tempur" meskipun website sepi.
  // Supaya user pertama tidak lemot (cold start).
  min: 10, 

  // 3. Durasi Koneksi Nganggur (30 detik)
  // Jika koneksi standby tidak dipakai selama 30 detik, tutup saja biar hemat RAM VPS.
  idleTimeoutMillis: 60000, 

  // 4. Batas Waktu Koneksi (5 detik)
  // Jika dalam 5 detik gagal connect ke DB (misal DB mati), langsung error.
  // Jangan biarkan user menunggu loading selamanya.
  connectionTimeoutMillis: 5000, 
})

const adapter = new PrismaPg(pool)
const prismaClientSingleton = () => {
  return new PrismaClient({ adapter })
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma