"use server";

import { auth } from "@/lib/utils/auth/auth";
import { headers } from "next/headers";
import {
  addressSchema,
  AddressValues,
} from "@/validations/addressValidation.md";
import {
  createAddressService,
  updateAddressService,
  deleteAddressService,
} from "@/lib/services/address";
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

export async function updateAddressAction(
  addressId: string,
  data: AddressValues,
) {
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
    await updateAddressService(session.user.id, addressId, validated.data);
    revalidatePath("/dashboard/profile");
    return { success: true, message: "Alamat berhasil diperbarui" };
  } catch (error) {
    console.error("Update Address Error:", error);
    return { success: false, message: "Gagal memperbarui alamat" };
  }
}

export async function deleteAddressAction(addressId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await deleteAddressService(session.user.id, addressId);
    revalidatePath("/dashboard/profile");
    return { success: true, message: "Alamat berhasil dihapus" };
  } catch (error) {
    console.error("Delete Address Error:", error);
    return { success: false, message: "Gagal menghapus alamat" };
  }
}
