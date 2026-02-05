export interface UserProfile {
  name: string;
  email: string;
  phoneNumber: string;
}


// Profile Dashboard types

export interface ProfileAvatarProps {
  image?: string | null;
  name: string;
  role: string | null | undefined; // Tambahkan null di sini
}


export interface PhoneInputSectionProps {
  displayPhone: string;
  isVerified: boolean;
  isLoading: boolean;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendVerification: () => void;
}

export interface OtpDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  phoneNumber: string;
  otpCode: string;
  setOtpCode: (code: string) => void;
  onVerify: () => void;
  isLoading: boolean;
}
