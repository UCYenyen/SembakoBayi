import { useState, useEffect } from 'react';
import { pusherClient } from '@/lib/utils/pusher/pusher-client';
import { ProductCardProps, ProductUpdateEvent } from '@/types/product.md';

export function useRealtimeProduct(initialData: ProductCardProps) {
    const [product, setProduct] = useState<ProductCardProps>(initialData);

    useEffect(() => {
        const channel = pusherClient.subscribe('shop-updates');

        const handleProductUpdate = (data: ProductUpdateEvent) => {
            if (data.id === initialData.id) {
                setProduct((prev) => ({
                    ...prev,
                    isOnSale: data.isOnSale,
                    discountAmount: data.discountAmount,
                    price: data.price
                }));
            }
        };

        channel.bind('product-updated', handleProductUpdate);

        // Cleanup
        return () => {
            channel.unbind('product-updated', handleProductUpdate);
            // Catatan: Jika ini list produk, sebaiknya jangan 'unsubscribe' channel global di sini
            // karena akan memutus koneksi card lain. Cukup unbind event saja.
            // pusherClient.unsubscribe('shop-updates'); 
        };
    }, [initialData.id]);

    return product;
}