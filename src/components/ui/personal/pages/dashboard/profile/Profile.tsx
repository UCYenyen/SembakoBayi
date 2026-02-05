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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/shadcn-ui/alert-dialog";
import { Plus, Pencil, Loader2, Trash2, MapPin } from "lucide-react";

import { authClient } from "@/lib/utils/auth/auth-client";
import { useProfile } from "@/hooks/use-profile";
import { Address } from "@prisma/client";
import { deleteAddressAction } from "@/lib/actions/address";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Import komponen baru
import { ProfileAvatar } from "@/components/ui/personal/elements/dashboard/profile/ProfileAvatar";
import { PhoneInputSection } from "@/components/ui/personal/elements/dashboard/profile/PhoneInputSection";
import { OtpDialog } from "@/components/ui/personal/elements/dashboard/profile/OTPDialog";
import { AddressPopup } from "@/components/ui/personal/elements/dashboard/profile/AddressPopup";

export default function Profile({ addresses }: { addresses: Address[] }) {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

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

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsAddressDialogOpen(true);
  };

  const handleCreateAddress = () => {
    setSelectedAddress(null);
    setIsAddressDialogOpen(true);
  };

  const confirmDeleteAddress = (id: string) => {
    setAddressToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteAddress = async () => {
    if (!addressToDelete) return;

    setIsDeleting(true);
    try {
      const res = await deleteAddressAction(addressToDelete);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Gagal menghapus alamat");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setAddressToDelete(null);
    }
  };

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
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Daftar Alamat</Label>
                  <p className="text-xs text-muted-foreground">
                    Kelola alamat pengiriman Anda
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleCreateAddress}
                >
                  <Plus className="w-4 h-4" /> Tamah Alamat
                </Button>
              </div>

              <div className="grid gap-3">
                {addresses.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">
                    Belum ada alamat tersimpan.
                  </p>
                )}
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="relative flex items-start gap-3 p-3 border rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">
                          {address.label}
                        </span>
                        {address.isDefault && (
                          <span className="bg-primary/10 text-primary text-[10px] px-1.5 py-0.5 rounded font-medium">
                            Utama
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {address.fullAddress}, {address.district},{" "}
                        {address.city}, {address.province} {address.postalCode}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleEditAddress(address)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => confirmDeleteAddress(address.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
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
        initialData={selectedAddress}
      />

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Alamat?</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin menghapus alamat ini? Tindakan ini tidak
              dapat dibatalkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDeleteAddress();
              }}
              className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              disabled={isDeleting}
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
