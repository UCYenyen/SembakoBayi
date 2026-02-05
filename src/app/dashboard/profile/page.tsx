import React from 'react'
import { Metadata } from 'next'
import Profile from '@/components/ui/personal/pages/dashboard/profile/Profile'
import prisma from '@/lib/utils/prisma'
import { auth } from "@/lib/utils/auth/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: 'Sembakobayi - Profil',
  description: 'Halaman profil pengguna di dashboard Sembakobayi',
}
export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/login");
  }

  const addresses = await prisma.address.findMany({
    where: {
      userId: session.user.id
    }
  })

  return (
    <Profile addresses={addresses}/>
  )
}