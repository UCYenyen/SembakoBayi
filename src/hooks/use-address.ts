import { useState, useEffect, useRef } from "react";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  AddressValues,
} from "@/validations/addressValidation.md";
import { createAddressAction } from "@/lib/actions/address";
import { toast } from "sonner";

import { updateAddressAction } from "@/lib/actions/address";

export function useAddress(
  initialData?: Partial<AddressValues> & { id?: string },
  onSuccess?: () => void,
) {
  const [isLoading, setIsLoading] = useState(false);

  // If initialData exists, we are in Edit mode
  const isEditing = !!initialData?.id;

  const form = useForm<AddressValues>({
    resolver: zodResolver(addressSchema) as Resolver<AddressValues>,
    defaultValues: {
      label: initialData?.label || "",
      province: initialData?.province || "",
      provinceId: initialData?.provinceId || "MANUAL",
      city: initialData?.city || "",
      cityId: initialData?.cityId || "MANUAL",
      district: initialData?.district || "",
      postalCode: initialData?.postalCode || "",
      fullAddress: initialData?.fullAddress || "",
      noteToDriver: initialData?.noteToDriver || "",
      isDefault: initialData?.isDefault || false,
      latitude: initialData?.latitude || undefined,
      longitude: initialData?.longitude || undefined,
    },
  });

  // Track if update is from map click to prevent loops
  const isMapClick = useRef(false);

  // Watch fields for forward geocoding
  const province = form.watch("province");
  const city = form.watch("city");
  const district = form.watch("district");
  const fullAddress = form.watch("fullAddress");

  // Debounced Forward Geocoding
  useEffect(() => {
    const handler = setTimeout(async () => {
      // If this update was caused by map click (reverse geocode), ignore forward geocode
      if (isMapClick.current) {
        isMapClick.current = false;
        return;
      }

      // Construct query
      const queryParts = [fullAddress, district, city, province].filter(
        Boolean,
      );
      if (queryParts.length < 1) return; // Search even if only 1 field is filled

      const query = queryParts.join(", ");
      console.log("Attempting forward geocode:", query);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&accept-language=id`,
        );
        const data = await res.json();

        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);

          // Update map immediately
          form.setValue("latitude", lat, { shouldValidate: true });
          form.setValue("longitude", lon, { shouldValidate: true });
        }
      } catch (error) {
        console.error("Forward geocoding failed", error);
      }
    }, 1000); // 1.0s debounce

    return () => clearTimeout(handler);
  }, [province, city, district, fullAddress, form]); // Dependencies for useEffect

  const handleMapClick = async (coords: { lat: number; lng: number }) => {
    isMapClick.current = true; // Set flag before updating form fields
    form.setValue("latitude", coords.lat, { shouldValidate: true });
    form.setValue("longitude", coords.lng, { shouldValidate: true });

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&accept-language=id`,
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
      let result;
      if (isEditing && initialData?.id) {
        result = await updateAddressAction(initialData.id, data);
      } else {
        result = await createAddressAction(data);
      }

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
