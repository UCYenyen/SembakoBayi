import { z } from "zod";

export const addressSchema = z.object({
  label: z.string().min(1, "Label alamat wajib diisi (contoh: Rumah, Kantor)"),
  provinceId: z.string().min(1, "Provinsi wajib dipilih"),
  province: z.string().min(1, "Provinsi wajib dipilih"),
  cityId: z.string().min(1, "Kota wajib dipilih"),
  city: z.string().min(1, "Kota wajib dipilih"),
  district: z.string().optional(),
  postalCode: z
    .string()
    .min(5, "Kode pos wajib 5 digit")
    .max(5, "Kode pos wajib 5 digit"),
  fullAddress: z
    .string()
    .min(10, "Alamat lengkap wajib diisi minimal 10 karakter"),
  noteToDriver: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  isDefault: z.boolean().default(false),
});

export type AddressValues = z.infer<typeof addressSchema>;
