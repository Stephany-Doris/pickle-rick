/*
  Warnings:

  - Added the required column `breed` to the `Cat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Cat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cat" ADD COLUMN     "breed" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;
