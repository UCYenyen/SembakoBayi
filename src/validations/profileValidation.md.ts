import { z } from "zod"

export const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Nama harus memiliki minimal 2 karakter",
  }),
  email: z.string().email({
    message: "Format email tidak valid",
  }),
  phoneNumber: z.string()
    .min(10, { message: "Nomor telepon minimal 10 digit" })
    .max(15, { message: "Nomor telepon maksimal 15 digit" })
    .regex(/^08[0-9]+$/, { message: "Nomor harus diawali 08 dan hanya berisi angka" }),
})

export type ProfileValues = z.infer<typeof profileSchema>