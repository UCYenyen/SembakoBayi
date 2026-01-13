import prisma from "./prisma";

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