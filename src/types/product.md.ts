export interface ProductCardProps{
    id: string;
    name: string;
    price: number;
    rating: number;
    imageSrc: string;
    isOnSale: boolean;
    discountAmount: number;
}

export interface Product extends ProductCardProps {
    description: string;
}