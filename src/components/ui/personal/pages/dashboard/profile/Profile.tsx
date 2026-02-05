"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/shadcn-ui/card";
import { Button } from "@/components/ui/shadcn-ui/button";
import { Input } from "@/components/ui/shadcn-ui/input";
import { Label } from "@/components/ui/shadcn-ui/label";
import { Separator } from "@/components/ui/shadcn-ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn-ui/select";
import { Plus, Pencil, Loader2 } from "lucide-react";

import { authClient } from "@/lib/utils/auth/auth-client";
import { useProfile } from "@/hooks/use-profile";
import { Address } from "@prisma/client";

// Import komponen baru
import { ProfileAvatar } from "@/components/ui/personal/elements/dashboard/profile/ProfileAvatar";
import { PhoneInputSection } from "@/components/ui/personal/elements/dashboard/profile/PhoneInputSection";
import { OtpDialog } from "@/components/ui/personal/elements/dashboard/profile/OTPDialog";
import { AddressPopup } from "@/components/ui/personal/elements/dashboard/profile/AddressPopup";

export default function Profile({ addresses }: { addresses: Address[] }) {
  const { data: session } = authClient.useSession();
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const {
    formData,
    displayPhone,
    handlePhoneChange,
    handleChange,
    handleSendVerification,
    handleVerifyOtp,
    handleSave,
    errors,
    isLoading,
    isOtpDialogOpen,
    setIsOtpDialogOpen,
    otpCode,
    setOtpCode,
  } = useProfile({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    phoneNumber: session?.user?.phoneNumber || "",
  });

  if (!session?.user) {
    return (
      <div className="flex justify-center mt-10">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <section className="flex mt-[20%] md:mt-[7.5%] flex-col min-h-screen w-full px-4 items-center justify-start">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader>
          <ProfileAvatar
            image={session.user.image}
            name={formData.name || session.user.name}
            role={session.user.role}
          />
        </CardHeader>

        <Separator />

        <CardContent className="space-y-8 py-6">
          <div className="grid gap-6">
            <div>
              <h3 className="text-lg font-medium">Informasi Pribadi</h3>
              <p className="text-sm text-muted-foreground">
                Perbarui detail foto dan informasi pribadi Anda.
              </p>
            </div>

            {/* Nama */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className={errors.name ? "text-red-500" : ""}
              >
                Nama
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "border-red-500" : ""}
                />
                <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Telepon */}
              <PhoneInputSection
                displayPhone={displayPhone}
                isVerified={!!session.user.phoneNumberVerified}
                isLoading={isLoading}
                error={errors.phoneNumber}
                onChange={handlePhoneChange}
                onSendVerification={handleSendVerification}
              />
            </div>

            {/* Alamat */}
            <div className="space-y-2">
              <Label>Alamat Utama</Label>
              <div className="flex gap-3">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih alamat pengiriman..." />
                  </SelectTrigger>
                  <SelectContent>
                    {addresses.map((address) => (
                      <SelectItem key={address.id} value={address.id}>
                        {address.label} - {address.fullAddress}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="secondary"
                  className="gap-2"
                  onClick={() => setIsAddressDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" /> Baru
                </Button>
              </div>
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardFooter className="flex justify-between py-6 bg-slate-50/50 rounded-b-xl">
          <div className="flex gap-4">
            <Button variant="outline">Batalkan</Button>
            <Button disabled={isLoading} onClick={handleSave}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Perubahan
            </Button>
          </div>
        </CardFooter>
      </Card>

      <OtpDialog
        isOpen={isOtpDialogOpen}
        onOpenChange={setIsOtpDialogOpen}
        phoneNumber={formData.phoneNumber}
        otpCode={otpCode}
        setOtpCode={setOtpCode}
        onVerify={handleVerifyOtp}
        isLoading={isLoading}
      />

      <AddressPopup
        isOpen={isAddressDialogOpen}
        onOpenChange={setIsAddressDialogOpen}
      />
    </section>
  );
}
