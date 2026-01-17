import prisma from "@/lib/utils/prisma";
import { ProductCardProps } from "@/types/product.md";

export async function getAllFeaturedProducts() {
  return prisma.product.findMany({
    include: {
      brand: true,
      category: true,
    },
    where:{
        NOT:{
            isHidden:true
        }
    }
  });
}

export async function getAllProduct(page: number = 1) : Promise<ProductCardProps[]> {
  const pageSize = 8;
  const skip = (page - 1) * pageSize;
  
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
    },
    where:{
        NOT:{
            isHidden:true
        }
    },
    skip,
    take: pageSize,
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    rating: 5, 
    imageSrc: product.imageUrl,
    isOnSale: product.onSale,
    discountAmount: Number(product.promoPrice || 0),
    category: {
      id: product.category.id,
      name: product.category.name,
      parent_id: product.category.parentId || "",
    },
    brand: {
      id: product.brand.id,
      name: product.brand.name,
    },
  }));
}

export async function getAllPopularProducts(): Promise<ProductCardProps[]> {
  const products = await prisma.product.findMany({
    include: {
      brand: true,
      category: true,
    },
    where: {
      NOT: {
        isHidden: true,
      },
    },
    take: 8,
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    rating: 5, 
    imageSrc: product.imageUrl,
    isOnSale: product.onSale,
    discountAmount: Number(product.promoPrice || 0),
    category: {
      id: product.category.id,
      name: product.category.name,
      parent_id: product.category.parentId || "",
    },
    brand: {
      id: product.brand.id,
      name: product.brand.name,
    },
  }));
}

export async function getProductDetails(
  slug: string
){
  return prisma.product.findUnique({
    where: {
      slug,
    },
    include: {
      brand: true,
      category: true,
    },
  });
}