/*
  Warnings:

  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(12,2)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE BIGINT,
ALTER COLUMN "weight" SET DEFAULT 0,
ALTER COLUMN "weight" SET DATA TYPE DECIMAL(12,2);
