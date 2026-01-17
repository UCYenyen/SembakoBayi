'use server';

import { UpdateProductValidation } from "@/validations/productValidation.md";
import { updateProductService } from "@/lib/services/product";
import { pusherServer } from '../utils/pusher/pusher-server';
import { revalidatePath } from 'next/cache';
import { ActionResponse } from '@/types/response.md'; 


export async function updateProductAction(payload: UpdateProductValidation): Promise<ActionResponse> {
  const validatedFields = UpdateProductValidation.safeParse(payload);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validasi Gagal",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const updatedProduct = await updateProductService(validatedFields.data);

    if (
      payload.price !== undefined || 
      payload.isOnSale !== undefined || 
      payload.discountAmount !== undefined
    ) {
      await pusherServer.trigger('shop-updates', 'product-updated', {
        id: updatedProduct.id,
        isOnSale: updatedProduct.onSale, 
        discountAmount: Number(updatedProduct.promoPrice ?? 0),
        price: Number(updatedProduct.price),
      });
    }

    revalidatePath('/shop');
    
    return { success: true, message: "Produk berhasil diupdate" };

  } catch (error: unknown) {
    let errorMessage = "Terjadi kesalahan server";
    
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return {
      success: false,
      message: errorMessage
    };
  }
}