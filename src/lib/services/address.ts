import prisma from "@/lib/utils/prisma";
import { AddressValues } from "@/validations/addressValidation.md";

export const createAddressService = async (
  userId: string,
  data: AddressValues,
) => {
  // If setting as default, unset other defaults
  if (data.isDefault) {
    await prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }

  return await prisma.address.create({
    data: {
      userId,
      label: data.label,
      provinceId: data.provinceId,
      province: data.province,
      cityId: data.cityId,
      city: data.city,
      district: data.district,
      postalCode: data.postalCode,
      fullAddress: data.fullAddress,
      noteToDriver: data.noteToDriver,
      latitude: data.latitude,
      longitude: data.longitude,
      isDefault: data.isDefault,
    },
  });
};

export const updateAddressService = async (
  userId: string,
  addressId: string,
  data: AddressValues,
) => {
  // Check ownership
  const existing = await prisma.address.findUnique({
    where: { id: addressId },
  });

  if (!existing || existing.userId !== userId) {
    throw new Error("Address not found or unauthorized");
  }

  // If setting as default, unset other defaults
  if (data.isDefault) {
    await prisma.address.updateMany({
      where: { userId, id: { not: addressId } },
      data: { isDefault: false },
    });
  }

  return await prisma.address.update({
    where: { id: addressId },
    data: {
      label: data.label,
      provinceId: data.provinceId,
      province: data.province,
      cityId: data.cityId,
      city: data.city,
      district: data.district,
      postalCode: data.postalCode,
      fullAddress: data.fullAddress,
      noteToDriver: data.noteToDriver,
      latitude: data.latitude,
      longitude: data.longitude,
      isDefault: data.isDefault,
    },
  });
};

export const deleteAddressService = async (
  userId: string,
  addressId: string,
) => {
  // Check ownership
  const existing = await prisma.address.findUnique({
    where: { id: addressId },
  });

  if (!existing || existing.userId !== userId) {
    throw new Error("Address not found or unauthorized");
  }

  return await prisma.address.delete({
    where: { id: addressId },
  });
};
