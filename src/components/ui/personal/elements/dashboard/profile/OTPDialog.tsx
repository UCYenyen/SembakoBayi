import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/shadcn-ui/dialog"
import { Input } from '@/components/ui/shadcn-ui/input'
import { Button } from '@/components/ui/shadcn-ui/button'
import { Loader2 } from 'lucide-react'
import { OtpDialogProps } from "@/types/user.md"

export function OtpDialog({ isOpen, onOpenChange, phoneNumber, otpCode, setOtpCode, onVerify, isLoading }: OtpDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Masukkan Kode OTP</DialogTitle>
          <DialogDescription>Dikirim ke <strong>{phoneNumber}</strong></DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <Input
            placeholder="6 digit kode"
            className="text-center text-lg tracking-widest"
            maxLength={6}
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button onClick={onVerify} disabled={isLoading || otpCode.length < 4} className="w-full">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Verifikasi"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}