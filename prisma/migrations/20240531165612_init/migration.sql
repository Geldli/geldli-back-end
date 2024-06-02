/*
  Warnings:

  - You are about to drop the column `diaPagament` on the `AtivoContinuo` table. All the data in the column will be lost.
  - You are about to drop the column `diaPagament` on the `DespesaContinua` table. All the data in the column will be lost.
  - Added the required column `diaPagamento` to the `AtivoContinuo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `diaPagamento` to the `DespesaContinua` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AtivoContinuo" DROP COLUMN "diaPagament",
ADD COLUMN     "diaPagamento" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "DespesaContinua" DROP COLUMN "diaPagament",
ADD COLUMN     "diaPagamento" INTEGER NOT NULL;
