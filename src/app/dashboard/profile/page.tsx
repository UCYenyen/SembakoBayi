import React from 'react'
import { Metadata } from 'next'
import Profile from '@/components/ui/personal/pages/dashboard/profile/Profile'

export const metadata: Metadata = {
  title: 'Sembakobayi - Profil',
  description: 'Halaman profil pengguna di dashboard Sembakobayi',
}
export default async function ProfilePage() {

  return (
    <Profile />
  )
}