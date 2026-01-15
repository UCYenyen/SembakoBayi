import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authClient } from '@/lib/utils/auth-client'

interface ProfileData {
    name: string;
    email: string;
    phoneNumber: string;
}

export function useProfile(initialData?: Partial<ProfileData>) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [displayPhone, setDisplayPhone] = useState("");
    const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    
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
    };

    const handleSendVerification = async () => {
        if (!formData.phoneNumber) {
            toast.error("Masukkan nomor telepon terlebih dahulu");
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
        handleChange,
        handlePhoneChange,
        handleSendVerification,
        handleVerifyOtp
    };
}