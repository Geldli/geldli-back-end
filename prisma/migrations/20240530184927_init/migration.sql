/*
  Warnings:

  - Changed the type of `data` on the `Ativo` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ativo" DROP COLUMN "data",
ADD COLUMN     "data" DATE NOT NULL;
