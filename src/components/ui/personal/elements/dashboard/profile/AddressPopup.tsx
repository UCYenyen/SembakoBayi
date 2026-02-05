"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/shadcn-ui/dialog";
import { Button } from "@/components/ui/shadcn-ui/button";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Textarea } from "@/components/ui/shadcn-ui/textarea";
import { Checkbox } from "@/components/ui/shadcn-ui/checkbox";
import { Loader2 } from "lucide-react";
import { useAddress } from "@/hooks/use-address";
import dynamic from "next/dynamic";

// Dynamically import MapPicker with SSR disabled
const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] w-full bg-slate-100 animate-pulse rounded-md flex items-center justify-center text-muted-foreground">
      Memuat Peta...
    </div>
  ),
});

interface AddressPopupProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddressPopup({ isOpen, onOpenChange }: AddressPopupProps) {
  const { form, isLoading, handleMapClick, onSubmit } = useAddress(() =>
    onOpenChange(false),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Alamat Baru</DialogTitle>
          <DialogDescription>
            Tandai lokasi pada peta untuk mengisi otomatis, atau isi manual.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Lokasi Peta</Label>
            <MapPicker
              value={
                form.watch("latitude") && form.watch("longitude")
                  ? {
                      lat: form.watch("latitude")!,
                      lng: form.watch("longitude")!,
                    }
                  : undefined
              }
              onChange={handleMapClick}
            />
            {form.formState.errors.latitude && (
              <p className="text-xs text-red-500">
                Mohon tandai lokasi pada peta
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="label">Label Alamat</Label>
              <Input
                id="label"
                placeholder="Rumah, Kantor, Kost"
                {...form.register("label")}
              />
              {form.formState.errors.label && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.label.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Kode Pos</Label>
              <Input
                id="postalCode"
                placeholder="12345"
                {...form.register("postalCode")}
              />
              {form.formState.errors.postalCode && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.postalCode.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="province">Provinsi</Label>
              <Input
                id="province"
                placeholder="Jawa Barat"
                {...form.register("province")}
              />
              {form.formState.errors.province && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.province.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Kota/Kabupaten</Label>
              <Input
                id="city"
                placeholder="Bandung"
                {...form.register("city")}
              />
              {form.formState.errors.city && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.city.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">Kecamatan</Label>
            <Input
              id="district"
              placeholder="Coblong"
              {...form.register("district")}
            />
            {form.formState.errors.district && (
              <p className="text-xs text-red-500">
                {form.formState.errors.district.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullAddress">Alamat Lengkap</Label>
            <Textarea
              id="fullAddress"
              placeholder="Jl. Ganesha No. 10..."
              {...form.register("fullAddress")}
            />
            {form.formState.errors.fullAddress && (
              <p className="text-xs text-red-500">
                {form.formState.errors.fullAddress.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Catatan untuk Kurir (Opsional)</Label>
            <Input
              id="note"
              placeholder="Pagar hitam, bel rusak..."
              {...form.register("noteToDriver")}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isDefault"
              checked={form.watch("isDefault")}
              onCheckedChange={(c) => form.setValue("isDefault", c === true)}
            />
            <Label htmlFor="isDefault">Jadikan Alamat Utama</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Alamat
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
