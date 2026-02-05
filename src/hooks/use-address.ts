import { useState } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  AddressValues,
} from "@/validations/addressValidation.md";
import { createAddressAction } from "@/lib/actions/address";
import { toast } from "sonner";

export function useAddress(onSuccess?: () => void) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema) as Resolver<AddressValues>,
    defaultValues: {
      label: "",
      province: "",
      provinceId: "MANUAL",
      city: "",
      cityId: "MANUAL",
      district: "",
      postalCode: "",
      fullAddress: "",
      noteToDriver: "",
      isDefault: false,
      // Explicitly cast undefined to match optional types if necessary,
      // but Zod .optional() usually allows undefined.
      latitude: undefined,
      longitude: undefined,
    },
  });

  const handleMapClick = async (coords: { lat: number; lng: number }) => {
    form.setValue("latitude", coords.lat, { shouldValidate: true });
    form.setValue("longitude", coords.lng, { shouldValidate: true });

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}`,
      );
      const data = await res.json();

      if (data.address) {
        if (data.address.state) form.setValue("province", data.address.state);
        if (data.address.city || data.address.town || data.address.county) {
          form.setValue(
            "city",
            data.address.city || data.address.town || data.address.county,
          );
        }
        if (data.address.suburb || data.address.district) {
          form.setValue(
            "district",
            data.address.suburb || data.address.district,
          );
        }
        if (data.address.postcode)
          form.setValue("postalCode", data.address.postcode);

        const parts = [
          data.address.road,
          data.address.house_number,
          data.address.suburb,
          data.address.city || data.address.town,
          data.address.state,
          data.address.postcode,
        ].filter(Boolean);

        form.setValue("fullAddress", parts.join(", "));
      }
    } catch (error) {
      console.error("Reverse geocoding failed", error);
    }
  };

  const onSubmit = async (data: AddressValues) => {
    setIsLoading(true);
    try {
      const result = await createAddressAction(data);
      if (result.success) {
        toast.success(result.message);
        form.reset();
        onSuccess?.();
      } else {
        toast.error(result.message);
        if (result.errors) {
          console.error(result.errors);
        }
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    handleMapClick,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
