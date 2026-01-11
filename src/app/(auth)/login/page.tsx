import React from 'react'
import LoginForm from '@/components/ui/personal/loginForm'
export default function page() {
  return (
    <div className='flex flex-col gap-4 justify-center items-center bg-background min-h-screen'>
      <LoginForm />
    </div>
  )
}
