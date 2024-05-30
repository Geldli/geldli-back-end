/*
  Warnings:

  - Added the required column `idCategoria` to the `Ativo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCategoria` to the `AtivoContinuo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCategoria` to the `Despesa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idCategoria` to the `DespesaContinua` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identificador` to the `DespesaContinua` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ativo" ADD COLUMN     "idCategoria" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AtivoContinuo" ADD COLUMN     "idCategoria" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Despesa" ADD COLUMN     "idCategoria" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "DespesaContinua" ADD COLUMN     "idCategoria" TEXT NOT NULL,
ADD COLUMN     "identificador" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "CategoriaDespesa" (
    "id" TEXT NOT NULL,
    "cores" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "CategoriaDespesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoriaAtivo" (
    "id" TEXT NOT NULL,
    "cores" TEXT NOT NULL,
    "idUsuario" INTEGER NOT NULL,

    CONSTRAINT "CategoriaAtivo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Despesa" ADD CONSTRAINT "Despesa_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaDespesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DespesaContinua" ADD CONSTRAINT "DespesaContinua_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaDespesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaDespesa" ADD CONSTRAINT "CategoriaDespesa_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ativo" ADD CONSTRAINT "Ativo_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaAtivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtivoContinuo" ADD CONSTRAINT "AtivoContinuo_idCategoria_fkey" FOREIGN KEY ("idCategoria") REFERENCES "CategoriaAtivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriaAtivo" ADD CONSTRAINT "CategoriaAtivo_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
