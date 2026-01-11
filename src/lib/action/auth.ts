'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { loginSchema, registerSchema, type LoginValues, type RegisterValues } from '@/types/authValidation.md' 

export async function login(data: LoginValues) {
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
export async function signup(data: RegisterValues) {
  const validatedFields = registerSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Format data tidak valid." };
  }

  const { email, password, name } = validatedFields.data;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }
  redirect("/login?message=Registrasi berhasil! Silakan masuk."); 
}