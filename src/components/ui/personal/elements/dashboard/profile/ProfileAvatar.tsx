import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/shadcn-ui/avatar'
import { Button } from '@/components/ui/shadcn-ui/button'
import { Camera } from 'lucide-react'
import { ProfileAvatarProps } from '@/types/user.md'

export function ProfileAvatar({ image, name, role }: ProfileAvatarProps) {
  return (
    <div className='flex flex-row items-start gap-6 pb-6'>
      <div className='relative group'>
        <Avatar className='w-28 h-28 border-4 border-white shadow-sm cursor-pointer group-hover:opacity-90 transition-opacity'>
          <AvatarImage src={image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className='absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full border-2 border-white cursor-pointer hover:bg-primary/90 transition-colors'>
          <Camera className="w-4 h-4" />
          <input type="file" className="hidden" accept="image/*" />
        </div>
      </div>
      <div className='flex flex-col gap-2 mt-2'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>{name}</h2>
          <p className='text-sm text-muted-foreground'>{role}</p>
        </div>
        <Button variant="outline" size="sm" className="w-fit gap-2">
          <Camera className="w-3 h-3" /> Ganti Foto
        </Button>
      </div>
    </div>
  )
}