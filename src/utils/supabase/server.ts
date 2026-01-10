import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// 1. Tambahkan 'async' di sini
export async function createClient() {
  // 2. Tambahkan 'await' di sini
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Method 'get' tetap sama
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        // Method 'set' perlu try-catch karena Server Component tidak boleh set cookie
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Error ini wajar jika dipanggil dari Server Component (bukan Server Action)
            // Middleware akan menghandle refresh session-nya
          }
        },
        // Method 'remove' juga perlu try-catch
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Error handling sama seperti set
          }
        },
      },
    }
  )
}