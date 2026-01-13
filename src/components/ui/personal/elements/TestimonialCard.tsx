import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from '@/components/ui/shadcn-ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/shadcn-ui/avatar'
import { FaStar } from "react-icons/fa";
import { TestimonialCardProps } from '@/types/testimonial.md'

export default function TestimonialCard({
    name = "Nama Pengguna",
    role = "Posisi / Jabatan",
    imageSrc = "/images/products/Apel50.webp",
    description = "Pelayanan sangat memuaskan dan produk berkualitas tinggi. Saya sangat merekomendasikan ini kepada rekan kerja saya!",
    rating = 5
}: TestimonialCardProps) {
    return (
        <Card className="w-full max-w-md mx-auto hover:shadow-lg transition-shadow duration-300">
            <CardContent className="text-start space-y-4">
                <div className='flex items-start justify-start w-full gap-2'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar key={index} className={index < rating ? "text-amber-300" : "text-muted-foreground"} />
                    ))}
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                    "{description}"
                </p>
            </CardContent>
            <CardFooter className="flex items-start justify-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/10">
                    <AvatarImage src={imageSrc} alt={name} className="object-cover" />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center space-y-1">
                    <CardTitle className="text-lg font-bold text-foreground">
                        {name}
                    </CardTitle>
                    <CardDescription className="text-start text-sm font-medium text-muted-foreground">
                        {role}
                    </CardDescription>
                </div>
            </CardFooter>
        </Card>
    )
}