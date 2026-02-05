"use server";

import { auth } from "@/lib/utils/auth/auth";
import { headers } from "next/headers";
import {
  addressSchema,
  AddressValues,
} from "@/validations/addressValidation.md";
import { createAddressService } from "@/lib/services/address";
import { revalidatePath } from "next/cache";

export async function createAddressAction(data: AddressValues) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  const validated = addressSchema.safeParse(data);
  if (!validated.success) {
    return {
      success: false,
      message: "Validasi Gagal",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  try {
    await createAddressService(session.user.id, validated.data);
    revalidatePath("/dashboard/profile");
    return { success: true, message: "Alamat berhasil ditambahkan" };
  } catch (error) {
    console.error("Create Address Error:", error);
    return { success: false, message: "Gagal menambahkan alamat" };
  }
}
