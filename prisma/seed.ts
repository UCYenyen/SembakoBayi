import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting seeding...');

  const categoriesData = ['Electronics', 'Fashion', 'Home & Living', 'Groceries', 'Automotive'];
  const categories = [];
  
  for (const name of categoriesData) {
    const cat = await prisma.category.create({
      data: { name },
    });
    categories.push(cat);
  }

  const brandsData = ['Apple', 'Samsung', 'Nike', 'IKEA', 'Local Brand'];
  const brands = [];

  for (const name of brandsData) {
    const brand = await prisma.brand.create({
      data: { name },
    });
    brands.push(brand);
  }

  const vendors = [];
  for (let i = 0; i < 5; i++) {
    const vendor = await prisma.vendor.create({
      data: { name: faker.company.name() },
    });
    vendors.push(vendor);
  }

  console.log('📦 Seeding 50 products...');

  for (let i = 0; i < 50; i++) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomBrand = brands[Math.floor(Math.random() * brands.length)];
    
    const randomVendors = vendors
      .sort(() => 0.5 - Math.random())
      .slice(0, faker.number.int({ min: 1, max: 3 }));


    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        slug: faker.helpers.slugify(faker.commerce.productName()).toLowerCase() + '-' + faker.string.alphanumeric(5).toLowerCase(),
        description: faker.commerce.productDescription(),
        price: BigInt(faker.commerce.price({ min: 10000, max: 5000000, dec: 0 })),
        stock: faker.number.int({ min: 0, max: 100 }),
        weight: faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 }), // Decimal
        onSale: faker.datatype.boolean(),
        brandId: randomBrand.id,
        categoryId: randomCategory.id,
        vendors: {
          connect: randomVendors.map((v) => ({ id: v.id })),
        },
        imageUrl: faker.image.url(),
      },
    });
  }

  console.log('✅ Created 50 products');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });