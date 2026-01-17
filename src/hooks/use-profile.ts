import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authClient } from '@/lib/utils/auth/auth-client'
import { profileSchema, type ProfileValues } from '@/validations/profileValidation.md'
import { UserProfile as ProfileData } from '@/types/user.md'

export function useProfile(initialData?: Partial<ProfileData>) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [displayPhone, setDisplayPhone] = useState("");
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [errors, setErrors] = useState<Partial<Record<keyof ProfileValues, string>>>({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '', 
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                phoneNumber: initialData.phoneNumber || ''
            });

            if (initialData.phoneNumber) {
                let clean = initialData.phoneNumber;
                if (clean.startsWith('0')) clean = clean.substring(1);
                if (clean.startsWith('62')) clean = clean.substring(2);
                if (clean.startsWith('+62')) clean = clean.substring(3);
                setDisplayPhone(clean);
            }
        }
    }, [initialData?.name, initialData?.email, initialData?.phoneNumber]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        
        if (errors[id as keyof ProfileValues]) {
            setErrors(prev => ({ ...prev, [id]: undefined }));
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        val = val.replace(/[^0-9]/g, '');

        if (val.startsWith('0')) {
            val = val.substring(1);
        } else if (val.startsWith('62')) {
            val = val.substring(2);
        }

        setDisplayPhone(val);

        setFormData(prev => ({
            ...prev,
            phoneNumber: val ? `0${val}` : '' 
        }));
        
        if (errors.phoneNumber) {
            setErrors(prev => ({ ...prev, phoneNumber: undefined }));
        }
    };

    const handleSave = async () => {
        setIsLoading(true);
        setErrors({});

        const result = profileSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors: Partial<Record<keyof ProfileValues, string>> = {};
            // GANTI .errors MENJADI .issues DI SINI
            result.error.issues.forEach((err) => {
                if (err.path[0]) {
                    fieldErrors[err.path[0] as keyof ProfileValues] = err.message;
                }
            });
            setErrors(fieldErrors);
            toast.error("Mohon perbaiki input yang salah");
            setIsLoading(false);
            return;
        }

        try {
            await authClient.updateUser({
                name: formData.name,
                image: null,
                phoneNumber: formData.phoneNumber,
            });
            
            toast.success("Profil berhasil diperbarui!");
            router.refresh();
        } catch (error) {
            toast.error("Gagal menyimpan perubahan");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendVerification = async () => {
        const result = profileSchema.shape.phoneNumber.safeParse(formData.phoneNumber);
        
        if (!result.success) {
            toast.error(result.error.issues[0].message); 
            return;
        }

        setIsLoading(true);
        try {
            await authClient.phoneNumber.sendOtp({ phoneNumber: formData.phoneNumber });
            await new Promise(r => setTimeout(r, 1000));
            setIsOtpDialogOpen(true);
        } catch (error) {
            toast.error("Gagal mengirim kode verifikasi");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        setIsLoading(true);
        try {
            await authClient.phoneNumber.verify({
                phoneNumber: formData.phoneNumber,
                code: otpCode,
                disableSession: false,
                updatePhoneNumber: true,
            });

            await new Promise(r => setTimeout(r, 1000));
            setIsOtpDialogOpen(false);
            toast.success("Nomor telepon berhasil diverifikasi!");
            router.refresh();
        } catch (error) {
            toast.error("Gagal memverifikasi kode OTP");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        displayPhone,
        otpCode,
        setOtpCode,
        isOtpDialogOpen,
        setIsOtpDialogOpen,
        isLoading,
        errors,
        handleChange,
        handlePhoneChange,
        handleSendVerification,
        handleVerifyOtp,
        handleSave
    };
}