/*
  Warnings:

  - You are about to drop the column `identificador` on the `Ativo` table. All the data in the column will be lost.
  - You are about to drop the column `identificador` on the `Despesa` table. All the data in the column will be lost.
  - You are about to drop the column `identificador` on the `DespesaContinua` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ativo" DROP COLUMN "identificador";

-- AlterTable
ALTER TABLE "Despesa" DROP COLUMN "identificador";

-- AlterTable
ALTER TABLE "DespesaContinua" DROP COLUMN "identificador";
