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
