import { z } from "zod";

export const CreateProductValidation = z.object({
    name: z.string().min(4, "Nama produk wajib diisi, minimal 4 karakter"),
    description: z.string().min(20, "Deskripsi produk wajib diisi, minimal 20 kata"),
    price: z.number().min(0, "Harga produk wajib diisi, minimal 0"),
    imageSrc: z.string().min(1, "Gambar produk wajib diisi"),
    stock: z.number().min(0, "Stok produk wajib diisi, minimal 0"),
    isOnSale: z.boolean().optional(),
    discountAmount: z.number().optional(),
});

export const UpdateProductValidation = z.object({
    id: z.string().min(1, "ID produk wajib diisi"),
    name: z.string().min(4, "Nama produk minimal 4 karakter").optional(),
    description: z.string().min(20, "Deskripsi produk minimal 20 kata").optional(),
    price: z.number().min(0, "Harga produk minimal 0").optional(),
    imageSrc: z.string().min(1, "Gambar produk wajib diisi").optional(),
    stock: z.number().min(0, "Stok produk minimal 0").optional(),
    isOnSale: z.boolean().optional(),
    discountAmount: z.number().optional(),
})

export const DeleteProductValidation = z.object({
    id: z.string().min(1, "ID produk wajib diisi"),
});

export type CreateProductValidation = z.infer<typeof CreateProductValidation>;
export type UpdateProductValidation = z.infer<typeof UpdateProductValidation>;
export type DeleteProductValidation = z.infer<typeof DeleteProductValidation>;