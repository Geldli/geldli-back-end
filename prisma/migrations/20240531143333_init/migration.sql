/*
  Warnings:

  - Added the required column `descricao` to the `Ativo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `AtivoContinuo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Despesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `DespesaContinua` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ativo" ADD COLUMN     "descricao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AtivoContinuo" ADD COLUMN     "descricao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Despesa" ADD COLUMN     "descricao" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DespesaContinua" ADD COLUMN     "descricao" TEXT NOT NULL;
