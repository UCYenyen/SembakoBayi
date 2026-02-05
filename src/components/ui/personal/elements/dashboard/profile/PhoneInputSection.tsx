import { Label } from '@/components/ui/shadcn-ui/label'
import { Input } from '@/components/ui/shadcn-ui/input'
import { Badge } from '@/components/ui/shadcn-ui/badge'
import { Button } from '@/components/ui/shadcn-ui/button'
import { Pencil, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { PhoneInputSectionProps } from '@/types/user.md'


export function PhoneInputSection({ 
  displayPhone, isVerified, isLoading, error, onChange, onSendVerification 
}: PhoneInputSectionProps) {
  return (
    <div className='space-y-2'>
      <div className="flex justify-between items-center">
        <Label htmlFor="phoneNumber">Nomor Telepon</Label>
        {isVerified ? (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
            <CheckCircle2 className="w-3 h-3" /> Terverifikasi
          </Badge>
        ) : (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
            <AlertCircle className="w-3 h-3" /> Belum Verifikasi
          </Badge>
        )}
      </div>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r pr-3 h-full max-h-[40px]">
          <span className="text-lg">🇮🇩</span>
          <span className="text-sm font-medium text-muted-foreground">+62</span>
        </div>
        <Input
          id="phoneNumber"
          type="tel"
          className={`pl-24 pr-10 ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
          placeholder="812-3456-7890"
          value={displayPhone}
          onChange={onChange}
        />
        <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none opacity-50" />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}

      {!isVerified && (
        <div className="pt-1">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onSendVerification}
            disabled={isLoading || !displayPhone}
            className="w-full"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Kirim Kode Verifikasi"}
          </Button>
        </div>
      )}
    </div>
  )
}