export interface ProductCardProps{
    id: string;
    name: string;
    slug: string;
    price: number;
    rating: number;
    thumbnail: string;
    isOnSale: boolean;
    discountAmount: number;
    category: {
        id: string;
        name: string;
        parent_id: string;
    };
    brand: {
        id: string;
        name: string;
    }
}

export interface Product extends ProductCardProps {
    description: string;
    stock: number;
    medias: string[];
}

export interface ProductUpdateEvent {
    id: string;
    isOnSale: boolean;
    discountAmount: number;
    price: number;
}