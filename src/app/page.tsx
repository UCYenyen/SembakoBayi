import { login, signup } from '@/lib/action/auth'

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-4 p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Login Supabase</h1>
      
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required className="border p-2 text-black" />
      
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required className="border p-2 text-black" />
      
      <div className="flex gap-2">
        {/* Tombol Login */}
        <button formAction={login} className="bg-blue-500 text-white p-2 rounded">Log in</button>
        
        {/* Tombol Sign Up */}
        <button formAction={signup} className="bg-green-500 text-white p-2 rounded">Sign up</button>
      </div>
    </form>
  )
}