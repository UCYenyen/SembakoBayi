'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { loginSchema, registerSchema, type LoginValues, type RegisterValues } from '@/types/authValidation.md' 

export async function signIn(data: LoginValues) {
  const validatedFields = loginSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: 'Format data tidak valid.' }
  }

  const { email, password } = validatedFields.data
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) {
    return { error: error.message }
  }
  revalidatePath('/', 'layout')
  redirect('/')
}
export async function signUp(data: RegisterValues) {
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Format data tidak valid." };
  }

  const { email, password, name, phone } = validatedFields.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    phone,
    options: {
      data: {
        full_name: name,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
    },
  });

  if (error) {
    return { error: error.message };
  }
   revalidatePath('/', 'layout')
  redirect("/login"); 
}