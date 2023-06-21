-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CLOTHING', 'SHOES', 'ACCESSORIES', 'HOME', 'BEAUTY');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "stock" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "category" "Category" NOT NULL,
    "status" "Status" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
