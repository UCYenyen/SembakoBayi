import prisma from "./prisma";

export async function getAllProducts() {
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

export async function getProductDetails()