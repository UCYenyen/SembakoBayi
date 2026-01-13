import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 1. Ambil User
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Definisi Route yang Diproteksi
  const path = request.nextUrl.pathname
  
  // Contoh: Halaman Admin hanya untuk role 'admin'
  const protectedAdminPaths = ['/dashboard/admin']
  
  // Contoh: Halaman User biasa
  const protectedUserPaths = ['/dashboard/user', '/account']

  // 3. Logika Pengecekan Auth & Role
  
  // Jika user belum login dan mencoba akses halaman protected
  if (!user && (path.startsWith('/dashboard') || path.startsWith('/account'))) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Jika user sudah login, cek ROLE-nya
  if (user) {
    // ASUMSI: Role disimpan di user_metadata. 
    // (Anda harus memastikan saat sign-up, role disimpan di metadata, 
    // atau query ke tabel public.users jika role ada di tabel terpisah)
    const userRole = user.user_metadata?.role || 'user' 

    // Cek Akses Admin
    if (protectedAdminPaths.some(p => path.startsWith(p))) {
      if (userRole !== 'admin') {
        // Jika bukan admin, tendang ke halaman unauthorized atau home
        const url = request.nextUrl.clone()
        url.pathname = '/unauthorized' // Pastikan buat halaman ini
        return NextResponse.redirect(url)
      }
    }

    // Cek Akses Lainnya (Opsional)
    // ...
    
    // Redirect user yang sudah login dari halaman auth (login/register) ke dashboard
    if (path === '/login' || path === '/register') {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
  }

  return response
}